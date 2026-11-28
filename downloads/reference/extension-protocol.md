# Extension backend protocol

The protocol between Hanafubuki and an extension's backend, version 1. The
types are `hanafubuki-extension-protocol`; the host side is
`hanafubuki-extensions` (`backend/`), the Rust SDK `hanafubuki-extension-sdk`
and the Python SDK `sdk/python/hanafubuki_extension`.
What a backend is, how it is supervised and what its permissions mean is
[rules/extensions.md](rules/extensions.md#backends).

The machine-readable form of the method tables below is the interface
export, `sdk/interfaces/backend/` (`bun run export:backend-interfaces`,
[rules/extensions.md](rules/extensions.md#the-interface-export)):
`host-api.openrpc.json` and `backend-calls.openrpc.json` list every method
in each direction with its params, result, permission and bounds, from the
protocol crate's method registry (`METHODS`); the manifest, the declarative
descriptor, extension preset and schema panel have their JSON Schema beside them.
Configuration schema annotations describe effective defaults and contextual validator
requirements; they do not claim JSON Schema executes package or catalog checks.
`config-examples.json` contains complete source TOML from loader-checked example
packages, with related files and the actual descriptor step kinds. The
documentation site renders both exports, an anchor per method, class, block
and key, on its Interface Reference page
([extension-dev-reference.en.mdx](../site/content/docs/extension-dev-reference.en.mdx),
`/docs/extension-dev-reference`). This document stays the authority on what
each method does.

## Transport and framing

- The backend's **stdin** carries the host's messages, its **stdout** the
  backend's. Nothing else may be written to stdout; **stderr** is its log.
- Each message is a frame, as in the Language Server Protocol: headers, each
  `Name: value` ending in `\r\n`, an empty line (`\r\n`), then a body of
  exactly `Content-Length` bytes of UTF-8 JSON.

  ```text
  Content-Length: 52\r\n
  \r\n
  {"jsonrpc":"2.0","id":1,"method":"ping","params":{}}
  ```

  `Content-Length` is required, its name matched without case; any other
  header (`Content-Type`) is ignored.
- **Bounds**: a header section of at most 1 KiB (its empty line included), a
  body of at most 4 MiB (`MAX_FRAME_BYTES`). A larger frame is refused before
  its body is read.
- A frame that does not read (no `Content-Length`, one that is not a
  number, headers that are not text or never end) or a body that is not a
  JSON-RPC message ends the channel: the host fails the backend's row.

## Messages

JSON-RPC 2.0: a **request** has `id` (a number or a string) and `method`;
a **notification** has `method` and no `id`; a **response** has the `id` it
answers and `result` or `error`. `params` may be absent (read as `null`,
then as the method's defaults). `jsonrpc` is written as `"2.0"` and not
checked when read. Members a peer does not know are ignored, and every
params and result type reads with defaults for what is missing; a params
object that does not read fails its call with `INVALID_PARAMS`.

Both sides call each other at any time: a backend's handler may call the
host while the host waits for its answer. Both SDKs dispatch ordinary requests
to worker threads. Their notification and shutdown callbacks run on the reader
thread and must return promptly so it can read replies or finish the shutdown.
A response to no waiting call is dropped.

## Errors

| Code | Name | Meaning |
| --- | --- | --- |
| -32700 | `PARSE_ERROR` | JSON-RPC's. |
| -32600 | `INVALID_REQUEST` | JSON-RPC's. |
| -32601 | `METHOD_NOT_FOUND` | No such method. |
| -32602 | `INVALID_PARAMS` | Its params do not read, or are not allowed (an unknown event topic). |
| -32603 | `INTERNAL_ERROR` | The answer could not be built. |
| -32001 | `PERMISSION_DENIED` | The extension was not granted what the method needs. |
| -32002 | `TIMED_OUT` | The call missed its bound (reported by the caller's side). |
| -32003 | `REQUEST_FAILED` | What the method does failed (a download, a process that would not start, an unknown instance). |
| -32004 | `UNAVAILABLE` | The channel ended before the answer: its `message` says why. |
| -32005 | `BUSY` | 16 of the backend's calls are being answered already. |

Agent Skills and MCP contributions are declarative manifest content, not new
backend configuration methods. The generated manifest reference includes
`contributes.agent.skills`, `mcpServers`, their typed stdio/HTTP transport and
own-setting references. See [Agent content](rules/extensions.md#agent-content)
for admission and ownership. Installing one does not grant an extension the
ability to patch Agent user configuration.

## The host calls the backend

| Method | Params | Result | Bound |
| --- | --- | --- | --- |
| `initialize` | `protocolVersion` (1), `extension` `{id, version}`, `permissions` (as granted: `instances`, `processes`, `network`, `filesystem`, `registerInstances`, `management`), `host` `{version}`, `dataDir`, `locale` (the language setting: `en`, `zh` or `auto`) | `protocolVersion`, `hooks` (the names it implements), `tools` (the MCP tools it publishes at run time: each `{name, description, inputSchema}`, checked as the manifest's are; one that does not read fails the start) | 10 s |
| `migrate` | `fromVersion` | anything | 10 s, after an update, only if announced |
| `activate` | `{}` | anything | 10 s, only if announced |
| `ping` | `{}` | `{}` | 5 s, every 10 s |
| `deactivate` | `{}` | anything | 1 s at its stop, only if announced |
| `uninstall` | `{}` | anything | 10 s, before it is uninstalled, only if announced |
| `shutdown` | `{}` | `{}`, then it exits | 1 s; its stdin is closed after the answer |
| `diagnostics.collectInstance` | `{id}` (one instance of the extension’s types) | `{documents: [{name, text}]}` | separately announced under the method name; same bounds and failure handling as `diagnostics.collect` |
| `diagnostics.collect` | `{}` | `{documents: [{name, text}]}` | 30 s; only when `diagnostics` is announced; at most 32 documents and 524288 aggregate UTF-8 name/text bytes |

The `diagnostics` hook contributes text or serialized JSON to the application's
diagnostic bundle. Each name is a unique file name, never a path. The host validates
the response once and writes under `app/extensions/<id>/`; the backend never receives
the workspace. Invalid output is `REQUEST_FAILED`, a missed deadline `TIMED_OUT`.
Failures become bundle issues while other contributors continue. Its existing
backend call fault policy still applies. Disabling the extension retires the
contributor through its row's existing owner registration.

- `initialize` is the first message. A `protocolVersion` other than 1 in
  its answer fails the start ("its backend speaks protocol version N").
  `initialize`, `migrate` and `activate` together stay within 16 s.
- **Hooks** are called only when `initialize`'s answer lists them; an
  unknown name there is ignored. A backend that does not announce `migrate`
  is updated without one: announcing it is how a backend says its data
  needs one. The hook `ui` is not a call of its own: it says the backend
  has a UI in the owner protocol ([Its UI](#its-ui)), so `ui.state` and
  `ui.call` are sent to it and its `ui.emit` is heard.
- Any other call the host makes (the provider callbacks, the panel and frame calls,
  a service call it forwards) has a 30 s bound. A call past its bound
  fails alone; three in a row end the channel.
- After `shutdown`'s answer and its stdin's end, the backend has a second to
  exit; then it is terminated.

**For what it contributes** (each only when it contributes it; 30 s):

| Method | Params | Result |
| --- | --- | --- |
| `provider.validateSpec` | `type` (one of the types it provides), `values` (the install parameters' values, after the host's own form checks), `instance` (as below, only when the instance exists: a reinstall with new values; absent when one is created) | `issues`: what is wrong, by parameter (`{}` when the values are good) |
| `provider.installPlan` | `type`, `kind` (`install`: a first install or a retry; `reinstall`: repeat installation, even with no component selected; `update`: a ready instance's), `recreateComponents` (names the host removes before running the steps, empty for an ordinary install or update), `values`, `instance` `{id, components}` | `steps`: step documents as a declarative type's `install.steps` are written, placeholders (`{host.python}`, `{extension.root}`, `{instance.root}`) and `strip` and `replace` included (`{ "kind": "write-file", "path": "{component.core}/a", "content": "{param.name}" }`) |
| `provider.launchPreflight` | `type`, `instance` (ID and resolved components), `values` (install values), `launchValues` (effective launch values) | `{}` to proceed or an RPC error explaining why the instance cannot start. A type opts in with `[launch] preflight = true`. Runs once per whole-instance launch, before starting its roles. It is read-only. A cancelled launch stops waiting and discards a late answer. |
| `provider.launchOptions` | `type`, `instance` (ID and resolved components) | `{options: {<source>: [string, …]}}` for the launch form’s `optionsSource` values, including for declarative types with static plans. Called when listing choices for this instance and when saving a new dynamic selection. |
| `provider.launchPlan` | `type`, `role` (a role without a static command), `port`, `values` (install parameters), `launchValues` (launch parameters including defaults), `instance` `{id, components}` | `argv`, `env`: the role's command as a declarative server's `command` and `env`, placeholders (`{port}`, `{host.python}`, `{extension.root}` too) allowed; the type's `[environment]` applies under it |
| `provider.checkUpdate` | `type` (one of its types that declares `update-check`), `values` (the instance's install parameters' values, as `provider.installPlan` gets them), `instance` `{id, components}` | `hasUpdate`: whether there is a newer applicable version, including updates installed externally (an instance its values pin to a version has none); `current` and `latest` (optional): the installed and the newest version as the user reads them; `notes` (optional): anything more for the user. Optional `components` lists `{name, current?, latest?, hasUpdate}`. A pending component update also marks the instance as updatable. A failed check is an error, which is recorded on that instance as its check's error |
| `provider.manage.<operation>` | `type`, `operation`, `instance` `{id, components}`, `values` (validated against the operation form, empty for a button without fields) | Optional `notice` and optional `steps` in install-plan format. The host executes a returned plan as an instance maintenance activity. |
| `ui.panel.query` | `panel`, `block`, `context` `{instanceId}` (the instance ID in management, `null` in Settings) | the block's data: `{rows: [{label, value}]}` for `info`, `{rows: [{<column key>: value}]}` for `table`, `{lines: [text]}` for `log`, `{value, label}` for `progress` (`value` from 0 to 1; not a number: unknown), `{severity, title, message}` for `status` (`info`, `success`, `warning`, `error`), `{rows: [{id, title, description, status: {label, severity}, actions: [action id]}]}` for `list`, `{text}` (Markdown) for `markdown`, `{title, text}` for `empty`, `{text}` for `loading` |
| `ui.panel.action` | `panel`, `action`, `values` (its form's, read against the form; `{}` for a list's action, which has none), `context`, `row` (a `list` row's `id`, for a list action, `null` for an actions block's button) | `notice`, and `url`: an HTTP(S) address the user's browser is asked to open, for a `toolbar = "openUrl"` action that declared none (it takes precedence over a declared one); the host validates it and refuses anything but HTTP(S) with a host and no credentials |
| `ui.frame.call` | `frame` (one of its frames' ids), `method` and `params` (as the frame's page called it), `context` (the frame's: `{instanceId}` in an instance's management, `instanceId` null in Settings and on a page of its own) | anything: what the page's `call` resolves with |
| `service.<method>` | `caller` (the calling extension's id, or `mcp:hanafubuki` for a tool published through `contributes.mcpTools`), `params` (service payload or MCP argument object) | anything, returned to the caller |

- `instance` is `{id, components}`: `components` holds each of the type's
  components by name as `{path, external}`, `path` the folder as the
  platform writes it (what a plan's `{component.<name>}` resolves to) and
  `external` whether it is a folder of the user's that the instance does
  not own ([instance-types.md](rules/instance-types.md#external-components)).
  A plan reads where a component is from here rather than from the root.
- The host checks and resolves a plan as it does a descriptor's: a step or
  argument that names an undeclared placeholder, a path that does not start
  in a declared component, an unknown step kind, or a value that would
  leave its component (`..`, a root) refuses the plan, with where, and so
  does a step that would remove or replace what an external component
  holds (`unpack`, a download's `unpackTo`, `git-clone`). A `run` step's
  effects are its program's: a backend never plans one that empties an
  external component. The backend names components, never paths; the host
  runs the steps.
- A backend-provided type may declare `install.steps` and `[update]` independently.
  An explicit `[reinstall]` supplies its own steps. Without it, a reinstall uses the install phase. A missing install or update phase uses `provider.installPlan`. Each step may carry a localized `title` in the owning extension's namespace, shown with its progress and on failure.
  A service command or environment may reference `{endpoint.api}` when the role
  declares `after = ["api"]`. The host supplies the ready dependency's base URL.
- For long-running maintenance, return a plan from `provider.manage.<operation>`
  promptly. The host tracks execution and cancellation in Task Center and holds
  the instance's maintenance permit until work and process cleanup have ended.
  The management caller receives the activity ID. The RPC timeout still applies
  to the callback that prepares the plan.
- `provider.checkUpdate` is the application's update check of an instance
  of a type that declares `update-check`
  ([instance-types.md](rules/instance-types.md#the-update-check)): the
  card's on-demand check and the daily one, which asks once per such
  instance, one instance after another. It is read-only and asked while
  the instance may run: it changes nothing. Within the 30 s bound and with
  three timeouts in a row ending the channel, a backend answers fast: it
  caches or shares what it fetches (a release list) between instances
  rather than fetching it for each.
- What a panel query answers is read tolerantly: a row that is not an
  object or has no `label` (a list's: no `title`) is left out, a value that
  is not text is shown as its JSON, at most 500 rows (a log's last 500
  lines) are kept, a cell (a title, a message) is cut at 2048 characters
  and Markdown at 65 536, a `value` that is not a number is unknown and one
  out of 0 to 1 is clamped, and a severity it does not know is `info`. A
  list row offers the block's actions its `actions` names (all of them
  without it), none without an `id`. A `progress`, `status`, `markdown`,
  `empty` or `loading` block whose answer is not an object (`null`) is not
  shown, so the backend shows and hides it by its answer. A block that
  names `"source": "state"` is not queried: it shows what is at its `path`
  in the UI's state, written and read as this answer is
  ([Its UI](#its-ui)); a path to nothing hides a block that shows one
  thing. A block of a kind the application does not know is shown as
  unsupported and never queried.

**Notifications to the backend**:

| Method | Params |
| --- | --- |
| `event` | `topic` (`settings`, `preferences`, `instance`, `server`, `task`), `data`: `{values}` for settings, the `host.preferences` result for preferences; an instance as `instances.get` returns it (sent too when only its components changed), or `{id, removed: true}`; a server as `servers.status` lists it, or `{instanceId, role, removed: true}`; for `task` `{phase, activity}`, `phase` `start` (first read), `progress` (changed while running) or `end` (no longer running: completed, failed, cancelled or evicted, or gone from the Task Center while running, then as last read with `removed: true`; its last event for it), `activity` as the catalog's `list_tasks` lists it |
| `ui.prompt.result` | `id`, `accepted`, `text` (the submitted string for an accepted text question, otherwise null). Delivered only to the backend that requested it. |
| `process.output` | `taskId`, `stream` (`stdout`, `stderr`), `data` (text, invalid UTF-8 replaced) |
| `process.exit` | `taskId` (a process's, or a task's of `python.ensure` or `git.*`), `status` (`exited`, `failed`, `cancelled`), `exitCode`, `error` |

Schema panels in `home.sections` and `taskCenter.tabs` use the existing query, action and state calls with no instance. A `pages` frame with `home = true` also opens from the Home grid. In a management or diagnostics schema panel, set `"cardMenu": true` on the panel or a standalone action to show it in matching Home instance cards' menus. The same panel or action can declare a `toolbar` placement too.

A `management.sections` entry names its own place in the rail: `icon` (`{ lucide = "activity" }` or `{ file = "ui/monitor.svg" }`), `group` and the `groupTitle` that group is headed by, and `order`. None of them is inferred from the entry's position in `ui` or from the other entries of the same extension, so one extension can contribute several sections under several groups, and the same page can appear in two slots with a label, an icon and a place of its own in each.

A schema panel in `management.overview` contributes its read-only `info`, `status`, `table` and `progress` blocks to the overview of matching instances. The block data uses the same query or pushed-state contract as a management section. A schema in `management.diagnostics` appears on the instance diagnostics page and uses the same query, action and state protocol. For these diagnostics panels and `management.sections` panels, set `toolbar: "button"` on the panel to open it from the instance title bar, or on a standalone actions button to run its action there. Use `toolbar: "externalBrowser"` for the action that replaces the surface's browser shortcut. The WebUI tabs menu can still open the live page. An instance management button can set `operation` to the current type’s own maintenance operation. Its fields and confirmation come from the type. Pressing it calls `provider.manage.<operation>` under the host's exclusive maintenance permit. Types without the referenced operation omit the button. A list action may set `rowField` to the name of a text field in that operation's form. The host supplies the selected row ID for that field; the user fills the other fields.

A successful `settings.patch` also refreshes the owning extension’s open desktop settings forms, including groups placed in a built-in settings category. The window receives only the owner id and reads the persisted settings. For application preferences use `host.preferences` and the `preferences` subscription. A backend with management read access can also request the mirrors view of `get_app_runtime_status` for model source and Micromamba mirror policy.

## The backend calls the host

Permissions are [rules/extensions.md](rules/extensions.md#the-host-api)'s
table; a denied call answers `PERMISSION_DENIED`.

| Method | Params | Result |
| --- | --- | --- |
| `host.info` | none | `version`, `protocolVersion`, `locale`, `platform` (`linux`, `macos`, `windows`), `instancesDir` (where the application creates an instance unless the user chooses otherwise, as native path text; read when asked, so it follows the setting; `null` only before the settings are read), `capabilities`: `{methods, topics}`, the host API's methods (requests and notifications) and the `events.subscribe` topics this host serves, from the registry (`host_capabilities`), whatever the extension was granted: a backend probes for a method or topic here rather than by `api` (absent from a host older than them), `mirrors`: `{automatic, pypi, github, huggingface}`, the user's download mirrors in Settings, each `{enabled, custom}` (`custom` the user's own URL or `null` for the default mirror; PyPI has no custom one), and `automatic` the user leaving the mirrors to `sd_webui_all_in_one`'s detection (the built-in launcher passes its `auto_mirror` with the switches, which Settings then shows disabled, and uses the mirrors it resolves); read when asked, so it follows Settings, `null` only before the settings are read. The backend itself retains its cleaned environment. Explicit `download.fetch.source` applies host GitHub/Hugging Face mirrors, and the Python requirements installer follows the host PyPI policy. A backend doing its own downloads applies the snapshot itself, passing them to `sd_webui_all_in_one` (its `auto_mirror`, `use_pypi_mirror`, `use_github_mirror`/`custom_github_mirror`, `use_hf_mirror`/`custom_hf_mirror`) or to its own script |
| `log.write` (also as a notification) | `level` (`error`, `warn`, `info` by default, `debug`), `message` | `{}` |
| `host.preferences` | none | `{locale, instancesDir, mirrors, network}`: current read-only preferences; locale, instances directory and mirrors have the same meanings and null/default behavior as `host.info`. `network` is `{proxyMode, proxyConfigured}`, mode `system`, `manual` or `disabled`; configured means an address is configured, not that it is active or reachable. No proxy address, credentials or global settings patch. Read this after subscribing or restarting to obtain the current snapshot. |
| `runtime.status` | optional `tool`: `python`, `git`, `micromamba` | `{tools: [{tool, status, path?, version?, error?}]}`. Omit tool for all three. Status is `notReady`, `preparing`, `ready`, `failed` or `unavailable`; this read never starts preparation. No permission required. |
| `runtime.resolve` | required `tool` | `{tool, path, version?}` from the existing runtime authority; requires `processes`. Starts or waits for preparation, cancelled when the backend stops. Missing/unknown tool is `INVALID_PARAMS`, missing permission `PERMISSION_DENIED`, preparation failure `REQUEST_FAILED`. Paths are executable paths; version is omitted when the authority has no executable version. |
| `settings.get` | none | `values`: its settings, as the store reads them (a value its field no longer takes left out) |
| `settings.patch` | `patch` (object of its declared setting keys; `null` unsets an override) | `values`: canonical values after schema validation and persistence, including defaults restored by unsetting. An undeclared key or invalid value refuses the whole patch (`REQUEST_FAILED`); malformed params are `INVALID_PARAMS`. Its subscribed `settings` topic receives `{values}` once after success. The owner comes from the backend, never a requested extension id; no additional permission, no global application settings write. |
| `storage.path` | none | `path`: its data directory |
| `instances.list` | none | `instances`: each `{id, name, type, path, running, components}`, `components` by name each `{path, external}` as a provider callback's instance names them (the folder in native form; `external`: a folder of the user's), read when asked so it follows a Paths change, empty when they cannot be resolved |
| `instances.get` | `id` | one instance, as `instances.list` lists it: what a frame or panel call, which names only the instance, reads its components from |
| `instances.configuration` | `id` (instance of its own types; requires `instances = own-types` or `all`) | `values` (install fields), `launchValues`, `valuesTruncated`, `launchValuesTruncated`. Both maps contain declared non-secret fields, including defaults, with the management projection’s credential redaction and size bounds. |
| `instances.ofType` | `type` (one of its types; all when absent) | `instances` |
| `instances.scan` | `path` (an absolute directory) | `attached` (the ids of the instances it added, an incomplete one (`attachedIncomplete`: a built-in layout without its Python, still to be installed) too), `warnings` (every result but a complete attachment, the incomplete ones included, each as the application's discovery writes it: `kind` (`alreadyManaged`, `pathConflict`, `attachedIncomplete`, `invalidPython`, `accessWarning`, `failed`, …), `path`, `message`, `instanceId`, `type`; read them tolerantly). A relative `path` is `INVALID_PARAMS`; one that is not a readable directory, or the discovery module not running, is `REQUEST_FAILED` with why. |
| `instances.import` | `type` (a registered type: one of its own with `instances = own-types`), `path` (an absolute directory, the instance's root), `name` (generated when absent), `componentPaths` (by component name, absolute or relative to `path`; `<path>/<name>` when absent; each must exist, as `path` must), `values` (its install parameters; their defaults for what is absent) | `id`: the instance, ready. A relative `path` is `INVALID_PARAMS`; values its type refuses, a directory that does not exist or one an instance already holds are `REQUEST_FAILED` with why. |
| `servers.status` | `instanceId` (one of its instances; all when absent) | `servers`: each `{instanceId, role, status, endpoint}`, `status` one of `stopped`, `starting`, `running`, `restarting`, `stopping`, `failed` |
| `webview.pages` | optional `instanceId` (one of its instances; all when absent) | `pages`: each `{instanceId, operationId, pageId, role, state, url}`, the embedded WebUI pages the application holds open for those instances: the launch and page the other `webview.*` name, the server role whose interface the page is, `state` one of `presented`, `parked`, `cleanupRequired`, and `url` the address the page was authorized for (not the document it has since navigated to) |
| `webview.show` | `instanceId`, `operationId` (its current launch), optional `pageId` (one of the launch's pages; the page shown last, else the launch's first) | `{}` once the application window was asked to show the page, as the WebUI tab manager's request does; the window routes there as the user picking it would. The launch authorizes the page first (`REQUEST_FAILED` for a launch that is not the instance's current one, a phase without pages, or a page it does not have). |
| `webview.close` | `instanceId`, `operationId`, optional `pageId` | `{}`. A named page waiting off screen is closed alone; the page on screen, or no page named, goes to the application window as the tab manager's close does (the workspace leaves it first). A page that is not open is already what was asked for. |
| `webview.reload` | `instanceId`, `operationId`, optional `pageId` | `{}` once the page's document was reloaded; the page keeps its session. Reloads the page the workspace shows or showed last; a named page must be that one (`REQUEST_FAILED` otherwise). |
| `webview.navigate` | `instanceId`, `operationId`, `pageId` (an open page), `url` | `{}` once the view was taken to `url`, which must be an HTTP(S) address whose `scheme`, `host` and port equal the page's authorized address's (`PERMISSION_DENIED` for another origin, `INVALID_PARAMS` for what is not a URL, `REQUEST_FAILED` for a page that is not open). The reconciliation holds the page to its authorized address afterwards as after any navigation. |
| `process.run` | optional `instanceId` (activity attribution to an instance of its type), `argv` (no shell), `cwd` (relative to its data directory, or absolute; its data directory when absent), `env` (added to its cleaned environment), `useHostProxy` (false by default; true applies the current host proxy over all caller proxy variables for this child, clearing them when the host proxy is off) | `taskId` |
| `process.cancel` | `taskId` | `{}` |
| `download.fetch` | `url` (`http` or `https`), `sha256` (64 hex characters, optional), `destination` (relative to its data directory, or absolute inside it), `source` (`direct` by default, `github` or `huggingface` for the corresponding HTTPS source through host mirrors), `cache` (false by default; true reuses verified digest-addressed content only when `sha256` is supplied) | `path` (the extension's destination), `sha256` |
| `http.request` | `url`, `method` (`GET` by default; `HEAD`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`), `headers` (list of `{name, value}`, repeated names preserved), `body` (optional UTF-8 text), `maxBytes` (1–524288, 524288 by default), `timeoutMs` (1–30000, 30000 by default) | `status` (actual HTTP status, including non-2xx), `headers` (list of `{name, value}`), `body` (UTF-8 text). Header names/values plus per-entry envelope allowance are bounded at 65536 bytes; the request body at 524288. Invalid parameters are `INVALID_PARAMS`, an ungranted source or redirect `PERMISSION_DENIED`, network/timeout/size/non-UTF-8 failures `REQUEST_FAILED`. Request and response bounds come from protocol constants; binary data uses `download.fetch`. |
| `events.subscribe` | `topics` (`settings`, `preferences`, `instance`, `server`, `task`; replaces the subscription) | `topics` |
| `ui.prompt` | `id` (a fresh local question id), `kind` (`confirm` or `text`), `message` | `{}` immediately. The main window identifies the extension and asks the user. The backend receives `ui.prompt.result` later, without a waiting call. A second pending question returns `BUSY`. Stopping the backend withdraws its question. |
| `ui.notify` | `message`, `level` (`info` by default, `warning`, `error`) | `{}` |
| `ui.progress` | `id` (local to this extension and scope), optional `instanceId` (one of the extension’s own instances, omit for application scope), `title`, `completed`, `total`, `done`, `error`, optional `showOnHome` (display this running progress on Home), optional `showOnManage` (display it in that instance’s management panel; ignored without an `instanceId`) | `{}` |
| `ui.taskCenter.open` | `tab` (one of its Task Center tabs: a panel’s or frame’s own id, from a backend that announced it in `contributes.ui`) | `{}` once the Task Center was asked to show that tab; a backend that contributes no such tab is `INVALID_PARAMS` |
| `python.ensure` | `version` (one the application installs, `3.11`), `destination` (relative to its data directory, or absolute inside what it may write; never that directory itself) | `taskId`, `pythonPath` (the interpreter once the task ended well). A directory there that is not a usable Python is replaced. |
| `git.clone` | `url` (`http`, `https`, `ssh`, `git`, or a `file` URL of a repository inside what it may use), `destination` (as `python.ensure`'s; must not exist), `branch` | `taskId`; its output is `process.output` |
| `git.pull` | `dir` (a repository, as `process.run`'s `cwd`), fast-forward only; its `origin` URL is checked as `git.clone`'s `url` | `taskId` |
| `services.call` | `extension` (one it depends on), `method` (one that extension exports), `params` | what the target answered |
| `tools.list` | none | `tools`: every tool of the management catalog, reads first, each `{name, title, description, scope, annotations, inputSchema, builtInOnly}`: `scope` the `management` level that may call it (`read` or `confirm`), `annotations` `{readOnly, destructive, idempotent, openWorld}`, `inputSchema` the JSON Schema of its arguments, `builtInOnly` whether it serves the built-in WebUI families' instances only (the kernel update, branch variants, snapshots, the hotpatch and launch arguments; the tools of the versions, extensions, models, PyTorch and environment sections are not marked, and also serve an instance whose type adopts a built-in type's management and declares the section). A mutation is listed whatever the extension was granted. |
| `tools.call` | `name` (a tool `tools.list` lists), `arguments` (as its `inputSchema` says; `{}` when absent) | the tool's own result, the JSON the catalog answers every caller (the Agent and MCP clients read the same). A tool that is not listed or arguments it does not read are `INVALID_PARAMS` with why; a mutation with `management = read` is `PERMISSION_DENIED`; a refusal (the user denied it or did not answer within 60 s, a restart of its own row) or the tool's failure is `REQUEST_FAILED` with why. |
| `ui.frame.emit` (a notification only) | `frame` (one of its frames' ids), `event`, `payload`, optional `instanceId` | none: each open frame of that id and, when given, that instance hands it to its page's listeners of `event`; no other extension's frame hears it. Sent as a request, it is answered `METHOD_NOT_FOUND`. |
| `ui.emit` (a notification only) | `state` (any JSON: the whole state), optional `instanceId` | none: pushed as its UI's state ([Its UI](#its-ui)); heard only from a backend that announced `ui`. Sent as a request, it is answered `METHOD_NOT_FOUND`. |
| `tools.register` (a notification only) | `tools`: each `{name, description, inputSchema}` | none: added to the backend’s MCP tools, or replacing its own of that name (and the manifest’s) — a tool whose name or schema the host cannot list refuses the whole notification and registers none. Sent as a request, it is answered `METHOD_NOT_FOUND`. |
| `tools.unregister` (a notification only) | `names` | none: each name removed from the backend’s tools; a manifest tool of that name is listed again, and a name it never had is ignored. Sent as a request, it is answered `METHOD_NOT_FOUND`. |

- The `preferences` topic carries the complete `host.preferences` result
  as the existing event's `params.data` (wire shape
  `{method: "event", params: {topic: "preferences", data: {...}}}`).
  It needs no permission. A successful host settings change affecting this
  projection sends it; a changed proxy address sends it even if the public
  mode/configured fields are unchanged, so a backend knows its next
  host-proxy operation reads new policy. Failed persistence and unrelated
  settings do not send it. Subscription sends no initial event: subscribe,
  then read `host.preferences`; after a backend restart subscribe again.
  The `settings` topic still carries only this extension's own values.
- A `process.run` activity keeps the executor’s bounded stdout and stderr for viewing, copying and export while its row is retained. Its optional `instanceId` places the task in that instance’s management view. It continues to run in the extension’s process group under its existing cwd permissions.
- `download.fetch` records transfer bytes in Task Center. A response without a known length uses indeterminate progress. A verified cache hit completes without a network transfer.
- `python.ensure`, `git.clone` and `git.pull` answer at once (`git.*`
  first waits for the application's Git while it is being prepared, on a
  first run); each runs as
  one of its tasks, listed in the Task Center, ended by `process.exit` and
  stopped by `process.cancel` or its backend's stop.
- `services.call` reaches the target's backend while it runs (`UNAVAILABLE`
  otherwise); the target's error, or its end mid-call, is the call's.
- `tools.call` answers when the tool is done; a mutation first waits for
  the user's answer in the main window (at most 60 s), so the host sets it
  no bound and the SDKs' `call` waits. A handler the host is waiting on (a
  frame's call, a panel action, each within 30 s; a `ui.call` within the
  bridge's 10 s) answers first and calls on a thread of its own, as for a
  scan. A tool that starts work answers its activity (`activityId`), which
  the `task` topic follows. The catalog's tools and their arguments are
  [mcp-server.md](rules/mcp-server.md#what-it-serves)'s and the management
  Skill's tool reference
  (`src-tauri/resources/skills/hanafubuki-webui-management/references/tools.md`);
  `sdk/interfaces/backend/management-tools.json` lists them.
- `instances.scan` and `instances.import` answer when they are done. A
  scan of a large tree takes as long as it takes: the host sets it no
  bound, the SDKs' `call` waits, and the backend's stop cancels it (the
  call then fails). A handler the host is waiting on (a frame's call, a
  panel action, each within 30 s) answers first and scans on a thread of
  its own, reporting with `ui.progress` and `ui.emit`. An import of a type
  its backend provides asks that backend's `provider.validateSpec` while
  the import waits; the SDKs answer it on a thread of its own.

## Its UI

A backend that lists the hook `ui` has a UI in the application's owner
protocol ([rules/extensions.md](rules/extensions.md#its-ui)): one state,
which its [schema panels'](rules/extensions.md#schema-panels) `state`
blocks and its frames show, and actions they call. Its row exposes the
service `<id>.ui` to the windows and to the extension's frames while it
runs; a backend that does not list `ui` has none, and nothing else about
it changes (the protocol stays version 1).

| Direction | Method | Params | Result |
| --- | --- | --- | --- |
| host → backend | `ui.state` | `context` (`{instanceId}` in an instance's management, only an instance of its own types, and `{ "instanceId": null }` elsewhere) | the state, any JSON |
| host → backend | `ui.call` | `action`, `args` (what the UI sent, any JSON), `context` | anything, answered to that caller only |
| backend → host (notification) | `ui.emit` | `state`, optional `instanceId` | none |

- **Bounds**: `ui.state` and `ui.call` are answered within the bridge's
  10 s (the window or frame hears `timeout` after that; the backend's late
  answer is dropped), inside the backend's 30 s call class, which still
  counts its misses. A panel with state-backed blocks reads `state` on mount
  and whenever the service is exposed anew. A frame page subscribes with
  `onState(listener)` and calls `state()` for its initial snapshot.
- **Errors** keep their kind for the UI: `INVALID_PARAMS` is `invalid`,
  `PERMISSION_DENIED` `forbidden`, any other error `failed` with its
  call's wording; a backend that is down is `unavailable`.
- **Pushes**: each `ui.emit` is the whole state, pushed to views of the same
  extension. Omit `instanceId` to broadcast (`<id>/ui.state`) or supply it to
  reach only views of that instance (`<id>/ui.state:<instanceId>`).
  The first push goes out immediately. Within the next 100 ms the host keeps
  the latest broadcast and the latest subsequent state for each instance; a state over 256 KiB as JSON is not sent
  (it is logged). A `ui.emit` sent before the row exposed the service
  (during `activate`) is dropped. Keep that state available through `ui.state`.
- A schema panel's block with `"source": "state"` and `"path": "a.b"`
  shows what is at `a.b` in the state (the whole state without a path),
  written as `ui.panel.query` answers for its kind (`{rows: [...]}`,
  `{lines: [...]}`) and read by the host as tolerantly, within the same
  bounds. The host asks `ui.state` for it, with the panel's context, when
  the panel opens and again after each push, once per window showing such
  a panel: keep `ui.state` cheap. Per instance data stays on
  `ui.panel.query`.

## Frames

The frame protocol below, the UI kit's classes, the schema panels' blocks
and field kinds, and the components a frame may use are exported as
structured definitions in `sdk/interfaces/frontend/` of the application's
repository (`frame.json`, `kit.json`, `panels.json`, `components.json`,
`tokens.json`, `utilities.json`, `examples.json`,
with their versions in `index.json`), with the component bundle's typings
in `sdk/ui/ui.d.ts`, generated from the tables and sources the application
itself reads (`bun run export:frontend-interfaces`,
[rules/frontend.md](rules/frontend.md#shared-components)). The
descriptions there are English. The site's Interface Reference page shows
them with the backend export (`/docs/extension-dev-reference#frontend`).

An extension's frame page ([rules/extensions.md](rules/extensions.md#frames))
speaks to the application's host component, never to the backend: by
`postMessage`, both ways, each message an object with `v` (1) and `type`.
The host takes a message only from its own frame's window and reads it
tolerantly: a member it does not know is ignored, a type it does not know
is ignored, and a message that does not read (another `v`, a `type` that
is not text, a `call` without an `id` or a `method`) is dropped. A request
the host answers itself (`pick-directory`, `update-instance`,
`navigate-instance`, `open-management-section`, `settings-get`, `settings-patch`, `open-settings`, `open-external`, `open-dialog`, `set-install-values`) whose `id` reads but whose other members do not is
answered `error` `invalid` instead, so the page's promise settles. The host
posts with the target `*` (the page's origin is opaque). The frame client
(`__hanafubuki/frame.js`, typed by `sdk/frame/frame.d.ts`) speaks it:

| From | `type` | Members | Meaning |
| --- | --- | --- | --- |
| page | `ready` | | It is set up; the host sends `theme` and pings it from now on. Without it within 10 s the frame is unavailable. |
| page | `call` | `id` (a number or text), `method`, `params` | Becomes `ui.frame.call`; answered by `result` or `error` with the same `id`. |
| host | `result` | `id`, `result` | What the backend or host answered. |
| host | `error` | `id`, `error` `{kind, message}`, `kind` one of `unavailable` (no backend, or it is down), `timeout` (it missed its 30 s bound; 10 s for `state`), `invalid`, `forbidden` (only for `state`), `failed` | The call failed. |
| page | `subscribe` | `event` | The host hands it the backend's events of that name for this frame. |
| host | `event` | `event`, `payload` | A `ui.frame.emit` for this frame that it subscribed to. |
| page | `state` | `id` (a number or text) | Reads its UI's state (`ui.state`, [Its UI](#its-ui)) with the frame's context; answered by `result` (the state) or `error` with the same `id`. Without the hook `ui` it is `unavailable`. |
| page | `subscribe-state` | | The host hands it each state the UI pushes from now on. |
| host | `state` | `state` | A push of its UI's state (`ui.emit`). |
| host | `dialog-closed` | `id`, `result` | How the dialog a frame's `open-dialog` opened ended: what its page's `close-dialog` carried, or `null` when the user dismissed it. |
| host | `task-center-tab.shown` | `tab` | One of this extension's Task Center tabs became the shown one: the page refreshes what it shows without polling. |
| page | `resize` | `height` (CSS pixels) | The frame's height, kept within 96–4096 (240 until the page sends one). There is no width: the frame spans its section. |
| host | `ping` | | Every 5 s once the frame is ready; answered by `pong`. A frame that answers none for 12 s is unavailable. |
| page | `pong` | | |
| page | `focus-exit` | | Escape (unless the page prevented it): the host moves focus to what follows the frame, or its section, then takes the Escape as its own: in Settings, Settings closes, as from a built-in section. A page that uses Escape (closing its own menu) prevents it. |
| host | `theme` | `scheme` (`light`, `dark`), `tokens` (CSS variable name → value), `locale` (the application's language, `en` or `zh`) | The application's theme and language, on `ready` and on every change of either. `tokens` are the role tokens (`FRAME_THEME_TOKENS`) and every token the application sets on its root at run time: the whole accent ramp (`--theme-seed`, `--accent-fill`, `-hover`, `-pressed`, `--text-on-accent`, `--accent-text`, `-hover`, `--accent-indicator`), the surface opacity and blur, and the scrollbar's arrow images. The client sets each token on its root, `data-theme`, `color-scheme`, and `lang`. |
| page | `pick-directory` | `id`, `title` (optional text, cut at 200 characters; anything else is no title) | The host opens the application's folder dialog; `result` is the native path chosen, or `null` when cancelled. |
| page | `update-instance` | `id`, optional `mode` (`update` or `reinstall`), `values` (an object of at most 64 entries) | Only in an instance's management section, for the frame's own instance (elsewhere `invalid`): the host asks the user to confirm the selected mode, defaulting to update for a ready type offering it and otherwise reinstalling in place, then starts it with the recorded install values and `values` over them (the reinstall request with a replacement `spec` and any components the user selected to rebuild in the host dialog; update preserves all components), which Rust validates. `result` (`null`) once it has started; its progress is the instance's install progress. `failed` with the reason when the user declines, another update is waiting for an answer, or the application refuses it. |
| page | `navigate-instance` | `id`, `instanceId` (text) | The host takes the user to that instance's page (`/instances/<instanceId>`), closing the window over it; `result` (`null`) once on its way, which may unmount the frame. |
| page | `open-management-section` | `id`, `section` (text), `instanceId` (text, omitted for the frame's own instance) | The host opens Instance Management at that section — a registered section id, not a route — for that instance; `result` (`null`) once on its way, which may unmount the frame. An unknown section, or a page outside instance management that names no instance, is `invalid`. |
| page | `settings-get` | `id` | Reads the frame owner's settings from the host; `result` is `{values: Record<string, unknown>}`. Works without a backend. |
| page | `settings-patch` | `id`, `patch` (an object) | Patches the frame owner's declared settings through Rust validation and persistence; `null` removes an override. `result` is `{values: Record<string, unknown>}` after the write. Works without a backend; no owner from the message is used. Invalid field values or undeclared keys fail without writing. |
| page | `open-settings` | `id`, `section` (text) | Opens a section in the current settings catalog through the primary-window navigation service. Unknown ids are `invalid`; result is `null`. Works without a backend. |
| page | `open-external` | `id`, `url` (text) | The guarded Rust command checks the mounted frame owner is active, validates HTTP/HTTPS once, and uses the shared system-browser opener. Result is `null`; invalid destinations and opener failures return `failed` with the reason. Works without a backend. |
| page | `open-task-center-tab` | `id`, `tab` (text) | Brings one of this extension's Task Center tabs (`taskCenter.tabs`, by the panel's or frame's own id) forward, opening the Task Center if it is closed. `result` (`null`); `invalid` for a tab the application does not list for this extension. |
| page | `open-dialog` | `id`, `frame` (text), optional `title` (text, cut at 200 characters) | Shows one of this extension's `dialogs` frames (`slot = "dialogs"`) in a dialog over the window, titled by `title` or the frame; the page is a frame in `dialog` mode (its own session, Escape closing it). `result` is what that page's `close-dialog` carried (any JSON up to 64 KiB, else `null`), or `null` when the user dismissed the dialog. `invalid` for an id that is not one of the extension's `dialogs` frames, `failed` while another is open. Works without a backend. |
| page | `close-dialog` | `result` (any JSON up to 64 KiB) | From a `dialogs` frame: closes its dialog and resolves its opener's `open-dialog` with `result`. Ignored in any other frame. |
| page | `set-install-values` | `id`, `values` (an object of at most 64 entries) | Only from a frame the creation wizard shows under an instance type's install form (`[[install.frames]]` of the type's descriptor; elsewhere `invalid`): merges into the form's draft the keys that form declares, as if the user typed them, so the wizard's validation and Rust's install see them; other keys are dropped. `result` (`null`). Works without a backend. |

The client's API: `ready()`; `call(method, params)`, a promise that rejects
with a `FrameError` whose `kind` is the error's; `on(event, listener)`,
which subscribes once per event and returns how to stop listening;
`state()`, a promise of its UI's state that rejects as `call` does; and
`onState(listener)`, which subscribes once (`subscribe-state`) and returns
how to stop listening. A state pushed before the page listened is not sent
again, so a page reads `state()` once as well. The host's own requests:
`pickDirectory({ title }?)`, a promise of the path or `null`;
`getSettings()` and `patchSettings(patch)`, promises of `{values}` from the
frame owner's settings, including for data-only extensions (`null` in a
patch removes an override; the Rust store owns validation and merging);
`openSettings(section)`, `openExternal(url)`, `updateInstance(values)`,
`navigateInstance(instanceId)` and `setInstallValues(values)`, promises of
nothing; each rejects as `call` does. `openDialog(frame, { title }?)`, a
promise of what the dialog's page closed with or `null`, and
`closeDialog(result?)`, from such a page, `openTaskCenterTab(tab)` and
`onTaskCenterTabShown(listener)`. The language: `locale()`, the
application's language or `null` before the first `theme`, and
`onLocale(listener)`, called with the first and each later one, which
returns how to stop listening. Its typings are `sdk/frame/frame.d.ts`, which
an extension refers to rather than copies. It
reports the height of its root (`<html>`) as it changes, so a page does
not size its root to the frame. A frame shown as an application page (the
`pages` slot) takes the whole height its host gives it and ignores
`resize`, so such a page scrolls its own content. A page is an ordinary HTML file of the
package; its scripts and styles are its package's files (no inline
script, no connection of its own), referred to by relative URLs.

### The UI kit

The application serves its own look to every frame, beside the client:
`__hanafubuki/ui.css`, linked by a relative URL (`<link rel="stylesheet"
href="../__hanafubuki/ui.css">` from `ui/index.html`), and the fonts it
loads from `__hanafubuki/fonts/`. It is generated from the application's
stylesheets (`sdk/frame/ui.css`): the design tokens for both schemes, the
shared classes, and the scrollbar, so a frame that links it draws with the
application's controls and typeface and follows the `theme` the client
applies (the static tokens come from the kit, what changes at run time
from `theme`). It sets the body's type and colour and nothing of the
document's geometry, so the page's height still follows its content. A
page that does not link it keeps the role tokens alone.

Its classes are an API, **class API 1**; a later version adds classes,
and renaming or removing one is a new version:

| Group | Classes |
| --- | --- |
| Buttons | `btn` (default), `btn-primary` (at most one per view), `btn-subtle`, `btn-danger` (a destructive confirmation only); sizes `btn-sm` (24px), default 32px, `btn-lg` (40px); `btn-icon` for a square icon button. Unavailable: `disabled`, or `aria-disabled="true"` to stay focusable. |
| Fields | `text-input` (on an `<input>`, a `<textarea>`, or a box wrapping one), `form-grid` (with `span-all` for a full row), `field-help`, `field-error`, `panel-actions` (a form's button row), `checkbox` (on `<input type="checkbox">`; `indeterminate` too) in a `check-row` beside its words. |
| Surfaces | `surface-card`, `surface-well`, `surface-floating`, `surface-layer`. |
| Lists and navigation | `card-list` of `card-row`s, a row holding an optional `card-row__icon`, `card-row__text` (`card-row__title`, `card-row__description`) and `card-row__control`; `menu-item` (`is-active`, `is-danger`); `tabs` of `tab` buttons, the selected one the one whose `aria-selected` (a tab list) or `aria-checked` (a radio group) is `true`. |
| Messages and progress | `info-bar` with `data-severity` `error`, `warning`, `success` or none (information), holding `info-bar__icon` (a 20px glyph the page supplies), `info-bar__text` (`info-bar__title`, `info-bar__message`), `info-bar__action`, `info-bar__dismiss`; `progress-bar` (`role="progressbar"`) holding `progress-bar__fill` whose `width` is the percentage, `data-size="lg"`, `data-tone` `success`, `warning`, `danger` or `muted`, `indeterminate`, `stepped`. |
| Helpers | `focus-inset` (a focus ring drawn inside, for a clipped row), `spin` (a turning glyph), `pulse` (a live dot), `text-secondary`, `mono`. |

The kit carries the application's other shared classes, the named
transitions its components use (`transitions.css`) and every token, but
only these classes are promised. It brings no script; the components are
the bundle's, below. A menu, a dropdown, a tooltip and a dialog cannot
leave the frame.

### The component bundle

The application also serves its own Vue components, built by the
application's build from the same sources (`src/ui`) the application uses,
so they are always the version of the application they run in:

- `__hanafubuki/vue.js`: Vue's runtime-only browser build, the
  application's version. It has no template compiler, and the frame's
  policy allows no `eval`: a page renders with `h()`, or ships templates
  its own build compiled.
- `__hanafubuki/ui.js`: the components. It imports only `./vue.js`, so a
  page that imports Vue from `../__hanafubuki/vue.js` shares the one
  runtime with them.
- `__hanafubuki/ui-components.css`: the components' own styles, linked
  after `ui.css`, whose classes, tokens and transitions they draw with.

A page loads them by relative URL, with a static `import` or `import()`;
a page built with a bundler leaves `vue` and the bundle external and maps
them to those URLs. Each Vue app installs `frameUi(frame)`, given the frame
client's module (`app.use(frameUi(frame))`); `ui.js` does not import the
client itself. That gives the components:

- **Their labels in the application's language:** English until the first
  `theme`, then the language `onLocale` reports, following each change.
  `useUiStrings().t(key)` gives a page the same strings (`UiStringKey`
  lists the keys the components use).
- **Browse through the application's folder dialog** (`pickDirectory`).
  In a frame a `PathInput` picks folders only: one of `kind: "file"`
  opens nothing, and the dialog does not start at the field's path.
- **Overlays in the page's `body`:** menus and tooltips are teleported
  there, or to `frameUi(frame, { teleportTo })`.
- **Links handed to the page:** a click on a `MarkdownDocument`'s link
  never navigates the frame and opens nothing by itself. The client
  `openExternal(url)` opens HTTP(S) links through the host. `frameUi(frame, { openLink })`
  accepts an `openLink` handler for absolute http, https, or mailto
  addresses. Even a data-only page can send HTTP(S) links to
  `openExternal`. The default handler takes no action.

Its exports are **UI API 1** (`UI_API_VERSION`), by what they are for:

| Group | Components |
| --- | --- |
| Inputs | `BaseInput`, `BaseTextarea`, `BaseDropdown`, `BaseSwitch`, `BaseSlider`, `BaseSelectableList`, `ChoiceCard`, `RadioMarker`, `PathInput`, `BaseColorPicker`, `BaseColorPickerPopover`, `TokenListInput` |
| Forms | `FormField`, `FormSection`, `FormPage`, `SchemaFormFields`, `SchemaFieldControl` |
| Settings rows | `SettingsGroup`, `SettingsRow`, `SettingsSwitch` |
| Structure | `PanelHeader`, `CardHeader`, `DetailSummary`, `BaseTabs`, `BaseCollapsible`, `NavList`, `ToolbarSlot` |
| Menus and tooltips | `ContextMenu`, `Tooltip`, `TooltipBubble`, `InfoTooltip`, `NativeTooltipHost` |
| Status and feedback | `InfoBar`, `InfoBarDetails`, `StatusBadge`, `ProgressBar`, `CornerStatusStack`, `RemovableTokenGroups`, `UpdateDot`, `UpdateHint`, `IconSwap` |
| Loading | `AsyncRegion`, `LoadingState`, `EmptyState`, `Skeleton`, `LoadMoreSentinel`, `RefreshButton` |
| Text | `MarkdownDocument` |

and with them the types their props name (`SchemaField` and its parts,
`NavListItem`, `ContextMenuItem`, `CornerStatusEntry` and the rest), the
constants `ICON_SIZES` and `SCHEMA_FIELD_KINDS`, `frameUi` and
`useUiStrings`. The first 25 came with application 0.3.34; the Settings
rows, the schema form, the lists and menus, the status and loading parts
and `MarkdownDocument` with 0.3.35.
Within a version, exports and optional props are only added, which is why
those additions left it at 1; removing or
renaming one, or changing what a prop means, is a new version. A page
needs the application version that added what it uses (`engines.hanafubuki`).
`components.json` lists each component's props, emits, slots and
`v-model`s; the typings are `sdk/ui/ui.d.ts` (Vue's own types from the
`vue` package of the same version).

In a frame the overlays behave as in the application, inside the frame's
viewport. A menu opens below or above its trigger, wherever it fits in the
frame; in an auto-height Settings section the frame is the whole page's
height, so a menu can open past the part of the window that shows. A menu
closes on a press outside it (in the page, or in the application, which
takes the frame's focus), Escape (which it prevents, so the host does not
also take it), Tab out of it, a scroll of the document or of a box around
its trigger, and a resize of the frame. So an auto-height frame whose page
changes height while a menu is open closes the menu: keep the page's
height steady while one may be open (a growing log is a box of fixed
height). A tooltip hides, and the tabs' overflow menu closes, on any scroll
in the frame, a scroll box of the page's own included.

What a few of them need of the page, having no application around them:

- **Schema texts** (`SchemaFormFields`, `SchemaFieldControl`): a
  `{ kind: "key" }` text is looked up in the application's `common`
  messages only (`UiStringKey` lists those the components use) and
  otherwise shows its key, so a page writes `{ kind: "literal", text: {
  en, zh } }`. The components shape values and evaluate `visibleWhen` and
  `disabledWhen`; nothing validates them but the page's backend. A `path`
  field picks folders only.
- **`SettingsRow`** stacks its control under its text when a container
  named `panel` is narrower than 480px: the page declares it (`container:
  panel / inline-size`) on what holds the rows. `SettingsSwitch` says On
  and Off in the application's language. `PanelHeader` drops its actions
  to a row of their own, and `BaseTabs` tightens, when the nearest
  container (of any name) is narrower than 480px; with none declared they
  keep their wide layout.
- **`CornerStatusStack`** docks to the bottom-end corner of its nearest
  positioned ancestor: give the region it reports for `position:
  relative`.
- **`NativeTooltipHost`** is mounted once in the page (in one app): from
  then on every `title` in the document is drawn as the application's
  tooltip.
- **`ContextMenu` and `BaseColorPickerPopover`** are kept mounted and told
  whether they are `open`; they are placed in the frame's viewport, as the
  other overlays are.
- **`MarkdownDocument`** shows its source's HTML as text. Its Copy button
  writes the clipboard, which a sandboxed frame may be refused: the button
  then stays as it is. An image in the source does not load: the renderer
  keeps http and https addresses only, and the frame's policy loads images
  from its own package, `data:` and `blob:`.
- **Icons.** The bundle exports no icon set: an `icon` prop (`PanelHeader`,
  `SettingsRow`, a `NavListItem`, a `ContextMenuItem`) takes a component of
  the page's own that renders an `<svg>` and accepts `size`.

Not in the bundle: dialogs (the
application's are part of its window's modal stack; a page asks its user
through its own inline surface, or through a host request such as
`updateInstance`, which confirms in the application), the main window's
status banners, and terminals.

## The SDKs

Both SDKs expose typed `runtime.status` and `runtime.resolve` wrappers.
`runtime.status` reads existing readiness only; `runtime.resolve` waits on
the host's preparation and returns the native executable path and optional
verified version/output. The wrappers have no short client-side timeout.
The host cancels the wait when the backend stops.

For instance-specific documents, Rust returns an `InstanceDiagnostics` from
`Handler::instance_diagnostics()`; Python overrides
`diagnostics_collect_instance(host, instance_id)`. The host requests these
documents when it collects that instance, including in a multi-instance bundle.

For application diagnostic contributions, Rust implements `Diagnostics::collect` returning
`DiagnosticsCollectResult` and returns `Some(self)` from
`Handler::diagnostics()`. The SDK adds `diagnostics` to initialize's hooks
and dispatches `diagnostics.collect` to this provider. Python overrides
`Handler.diagnostics_collect(host)`, returning the same typed dictionary;
the default `hooks()` then announces `diagnostics`. Both use the same
`{documents: [{name, text}]}` result. Names are single filenames and contents
must exclude credentials. The host owns collection bounds and workspace writes.

### Rust

`hanafubuki_extension_sdk::run(handler)` runs the loop over stdin and
stdout until `shutdown` or the end of stdin. A `Handler` answers
`initialize` (by default with protocol 1 and `hooks()`), `ping` (by default
at once), each other request (`request`, hooks included) on a thread of its
own, and each notification and `shutdown` on the reader thread. Both callbacks
return promptly. Waiting for a host reply there blocks the thread that
would deliver it. `Host` calls the application (`call`, `call_as`) and waits for
the answer, and sends notifications (`notify`, `log`,
`emit_frame(frame, event, payload)` for `ui.frame.emit`, and
`emit_state`). Use `emit_frame_for(Some(id), frame, event, payload)` or
`emit_state_for(Some(id), state)` to address one instance. Once the channel closes a call fails with `UNAVAILABLE`. `call_as` takes the protocol crate's params and results,
re-exported as `hanafubuki_extension_sdk::protocol`
(`host.call_as::<_, InstancesScanResult>(method::INSTANCES_SCAN,
&InstancesScanParams { path })`). Every host API method also has a typed
wrapper on `Host` (`src/calls.rs`): `host_info()`, `settings()`,
`storage_path()`, `instances_list()`, `instances_get(&params)`, …,
`services_call(&params)`, `list_tools()` and `call_tool(name, arguments)`,
each taking the method's params type and answering its result type (the
notifications are `log`, `emit_frame` and `emit_state`). A test keeps one
wrapper per host API method of the registry.

The calls the host makes reach `request` by their method's name, the
protocol crate typing each one's params and result: a provider of types
reads `provider.checkUpdate`'s `CheckUpdateParams`
(`serde_json::from_value(params)`) and answers a `CheckUpdateResult`, as it
answers `provider.installPlan` with an `InstallPlanResult`.

A backend with a UI ([Its UI](#its-ui)) implements `Ui` and returns it from
`Handler::ui` (`None` by default):

```rust
impl Handler for Backend {
    fn ui(&self) -> Option<&dyn Ui> {
        Some(self)
    }
}

impl Ui for Backend {
    fn state(&self, host: &Host, context: &PanelContext) -> Result<Value, RpcError> {
        Ok(json!({ "jobs": { "rows": self.jobs() } }))
    }

    // By default every action is `invalid_params` ("no action `x`").
    fn call(&self, host: &Host, action: &str, args: Value, context: &PanelContext)
        -> Result<Value, RpcError> { /* … */ }
}
```

The SDK then adds `ui` to `initialize`'s hooks (whatever `initialize`
answers) and hands `ui.state` and `ui.call` to it, each on a thread of its
own, their params read tolerantly (`INVALID_PARAMS` when they do not read);
without one they reach `request`. `Host::emit_state(state)` sends
`ui.emit`. With its `test-support` feature the crate builds
`hanafubuki-test-backend`, the fault-injection backend the test suites
start.

### Python

`sdk/python/hanafubuki_extension` (standard library only, Python 3.10 or
later), shipped with the application and on a Python backend's import
path. A backend subclasses `Handler`, overriding what it implements, and
calls `run(handler)`:

```python
from hanafubuki_extension import Handler, RpcError, REQUEST_FAILED, run


class Backend(Handler):
    def __init__(self):
        self.jobs = []

    def activate(self, host):
        host.log("info", "ready")

    def install_plan(self, host, type_id, kind, values, instance):
        return [{"kind": "write-file", "path": "{component.core}/a.txt", "content": kind}]

    def panel_query(self, host, panel, block, context):
        version = host.call("host.info")["version"]
        return {"rows": [{"label": "Hanafubuki", "value": version}]}

    # Announces the hook `ui`: a block with "source": "state", "path": "jobs"
    # shows `jobs`, and changes with each push.
    def ui_state(self, host, context):
        return {"jobs": {"rows": self.jobs}}

    def panel_action(self, host, panel, action, values, context):
        self.jobs.append({"name": values.get("name", "")})
        host.emit_state(self.ui_state(host, context))
        return "added"


run(Backend())
```

- `run` answers `initialize` (protocol 1 and the hooks the handler
  overrides: `activate`, `deactivate`, `migrate`, `uninstall`, `ui`
  for `ui_state` or `ui_call`, and `diagnostics` for `diagnostics_collect`)
  and `ping`. It dispatches ordinary requests to worker threads, and runs
  `notification` and `shutdown` on the reader thread. It returns after
  `shutdown` or the end of stdin. It moves `sys.stdout` to stderr, so a
  `print` goes to the log instead of breaking a frame.
- The handler's methods map the calls: `validate_spec` (given `instance`
  by keyword when the call carries one and the override takes it, so one
  written with three parameters is still called), `install_plan`,
  `launch_options` (returns the source-to-choices map for an instance),
  `launch_preflight` (raise `RpcError` to refuse), `launch_plan`, `check_update` (`provider.checkUpdate`:
  `check_update(host, type_id, values, instance)` returns the result's
  object, `{"current", "latest", "hasUpdate", "notes"}`),
  `manage` (`provider.manage.<operation>`, with form `values` by keyword; returns a notice, `None`, or a dictionary containing `steps` and optional `notice`), `panel_query`,
  `panel_action` (given `row` by keyword for a list's action when the
  override takes it, so one written without it is still called),
  `frame_call` (`ui.frame.call`), `ui_state`, `ui_call`, `service`
  (`service.<method>`), and `request` for any other. One that raises `RpcError` answers with it; any other exception
  answers `INTERNAL_ERROR` with its type and message.
- `ui_state(host, context)` answers `ui.state` and
  `ui_call(host, action, args, context)` `ui.call` ([Its UI](#its-ui)); a
  handler that overrides either announces the hook `ui`, and `ui_call`
  answers an action it does not have with `INVALID_PARAMS`.
- `Host.call(method, params)` waits for the answer and raises `RpcError`
  (`host.call("instances.scan", {"path": folder})["attached"]`);
  `Host.notify`, `Host.log`, `Host.emit_frame(frame, event, payload)` and
  `Host.emit_state(state)` (`ui.emit`) send notifications. The latter two accept
  the keyword argument `instance_id` to address one instance;
  `Host.list_tools()` and `Host.call_tool(name, arguments)` call
  `tools.list` and `tools.call`; `initialize_params` is what `initialize`
  said.
- `protocol.py` names each host API method as a constant (`HOST_INFO`,
  `TOOLS_CALL`, …). They are written by hand and checked, not generated:
  `hanafubuki-interface-export`'s test fails while they differ from
  `host-api.openrpc.json`, which keeps the SDK one plain file with no
  generated part and needs no second output of the export.

