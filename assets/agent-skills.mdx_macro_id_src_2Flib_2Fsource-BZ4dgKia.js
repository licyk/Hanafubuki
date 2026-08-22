import{r as e}from"./rolldown-runtime-hePW80VL.js";import{t}from"./jsx-runtime-NZYk81nU.js";var n=e(t()),r={title:`Skills`,description:`安装、启用和选择可复用的 Agent 工作流程。`,icon:`Puzzle`},i={contents:[{heading:void 0,content:`Skill 是包含说明、资源和可选脚本的工作流程包。它可以指导 Agent 处理特定任务，但不会绕过会话模式、工具策略和权限审批。`},{heading:`安装和检查`,content:`在“设置 → Agent → Skills”中，可以从来源目录安装 Skill，并对已安装内容执行刷新、更新、启用、停用或删除。`},{heading:`安装和检查`,content:`安装前检查：`},{heading:`安装和检查`,content:`包名称、用途、版本和来源是否符合预期。`},{heading:`安装和检查`,content:"`SKILL.md` 中声明的操作步骤和触发条件。"},{heading:`安装和检查`,content:`引用资料、资源文件和脚本内容。`},{heading:`安装和检查`,content:`需要的 MCP 服务、传输方式和外部地址。`},{heading:`安装和检查`,content:`是否允许 Agent 在未点名时隐式使用该 Skill。`},{heading:`安装和检查`,content:`Skill 中的说明和脚本可以引导 Agent
执行命令、修改文件或调用外部工具。只安装可信来源，并在更新后重新检查差异和依赖。`},{heading:`全局启用与当前会话`,content:`全局启用状态决定 Skill 是否默认提供给新会话。会话创建后会保留自己的 Skill 可用集合，因此修改全局状态不会静默重写正在进行的轮次。`},{heading:`全局启用与当前会话`,content:`设置页面可以为当前会话安排启用或停用：`},{heading:`全局启用与当前会话`,content:`选择当前 Agent 会话。`},{heading:`全局启用与当前会话`,content:`对目标 Skill 安排启用或停用。`},{heading:`全局启用与当前会话`,content:`检查“下一轮生效”的待处理状态。`},{heading:`全局启用与当前会话`,content:`需要撤回时，在下一轮开始前取消待处理变更。`},{heading:`全局启用与当前会话`,content:`同一会话中，“可用”“当前轮已启用”和“下一轮待变更”是不同状态。当前轮已经冻结后，临时修改不会改变正在运行的模型请求。`},{heading:`为下一条消息选择-skill`,content:"执行 `/skills`，或使用输入框中的 Skill 选择器，为下一条消息选择当前会话可用的 Skills。选中状态只随这次提交发送，不代表永久启用。"},{heading:`为下一条消息选择-skill`,content:`提示中明确点名 Skill 可以减少歧义，例如：`},{heading:`为下一条消息选择-skill`,content:`如果 Skill 允许隐式调用，Agent 也可以根据描述选择它；需要稳定流程时仍建议显式选择或点名。`},{heading:`更新和删除`,content:`有来源记录的 Skill 可以检查上游提交并更新。更新前确认来源、分支或提交仍然可信；更新后重新阅读说明、脚本和 MCP 依赖。`},{heading:`更新和删除`,content:`删除只移除已安装包。当前会话可能仍保存创建时的 Skill 身份和历史记录，但不能假设删除后正在运行的轮次会被改写。应先等待当前任务结束，再整理会话能力。`},{heading:`skill-creator`,content:`Skill Creator 用于创建或基于现有 Skill 分叉草稿。推荐流程：`},{heading:`skill-creator`,content:`验证通过只说明包结构满足规则，不代表脚本逻辑、安全性和外部依赖已经人工审查。`}],headings:[{id:`安装和检查`,content:`安装和检查`},{id:`全局启用与当前会话`,content:`全局启用与当前会话`},{id:`为下一条消息选择-skill`,content:`为下一条消息选择 Skill`},{id:`更新和删除`,content:`更新和删除`},{id:`skill-creator`,content:`Skill Creator`}]},a=[{depth:2,url:`#安装和检查`,title:(0,n.jsx)(n.Fragment,{children:`安装和检查`})},{depth:2,url:`#全局启用与当前会话`,title:(0,n.jsx)(n.Fragment,{children:`全局启用与当前会话`})},{depth:2,url:`#为下一条消息选择-skill`,title:(0,n.jsx)(n.Fragment,{children:`为下一条消息选择 Skill`})},{depth:2,url:`#更新和删除`,title:(0,n.jsx)(n.Fragment,{children:`更新和删除`})},{depth:2,url:`#skill-creator`,title:(0,n.jsx)(n.Fragment,{children:`Skill Creator`})}];function o(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,ul:`ul`,...e.components},{Callout:r,Step:i,Steps:a}=t;return r||c(`Callout`,!0),i||c(`Step`,!0),a||c(`Steps`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:`Skill 是包含说明、资源和可选脚本的工作流程包。它可以指导 Agent 处理特定任务，但不会绕过会话模式、工具策略和权限审批。`}),`
`,(0,n.jsx)(t.h2,{id:`安装和检查`,children:`安装和检查`}),`
`,(0,n.jsx)(t.p,{children:`在“设置 → Agent → Skills”中，可以从来源目录安装 Skill，并对已安装内容执行刷新、更新、启用、停用或删除。`}),`
`,(0,n.jsx)(t.p,{children:`安装前检查：`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`包名称、用途、版本和来源是否符合预期。`}),`
`,(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:`SKILL.md`}),` 中声明的操作步骤和触发条件。`]}),`
`,(0,n.jsx)(t.li,{children:`引用资料、资源文件和脚本内容。`}),`
`,(0,n.jsx)(t.li,{children:`需要的 MCP 服务、传输方式和外部地址。`}),`
`,(0,n.jsx)(t.li,{children:`是否允许 Agent 在未点名时隐式使用该 Skill。`}),`
`]}),`
`,(0,n.jsx)(r,{type:`warn`,title:`Skill 可能带来真实操作`,children:(0,n.jsx)(t.p,{children:`Skill 中的说明和脚本可以引导 Agent
执行命令、修改文件或调用外部工具。只安装可信来源，并在更新后重新检查差异和依赖。`})}),`
`,(0,n.jsx)(t.h2,{id:`全局启用与当前会话`,children:`全局启用与当前会话`}),`
`,(0,n.jsx)(t.p,{children:`全局启用状态决定 Skill 是否默认提供给新会话。会话创建后会保留自己的 Skill 可用集合，因此修改全局状态不会静默重写正在进行的轮次。`}),`
`,(0,n.jsx)(t.p,{children:`设置页面可以为当前会话安排启用或停用：`}),`
`,(0,n.jsxs)(t.ol,{children:[`
`,(0,n.jsx)(t.li,{children:`选择当前 Agent 会话。`}),`
`,(0,n.jsx)(t.li,{children:`对目标 Skill 安排启用或停用。`}),`
`,(0,n.jsx)(t.li,{children:`检查“下一轮生效”的待处理状态。`}),`
`,(0,n.jsx)(t.li,{children:`需要撤回时，在下一轮开始前取消待处理变更。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`同一会话中，“可用”“当前轮已启用”和“下一轮待变更”是不同状态。当前轮已经冻结后，临时修改不会改变正在运行的模型请求。`}),`
`,(0,n.jsx)(t.h2,{id:`为下一条消息选择-skill`,children:`为下一条消息选择 Skill`}),`
`,(0,n.jsxs)(t.p,{children:[`执行 `,(0,n.jsx)(t.code,{children:`/skills`}),`，或使用输入框中的 Skill 选择器，为下一条消息选择当前会话可用的 Skills。选中状态只随这次提交发送，不代表永久启用。`]}),`
`,(0,n.jsx)(t.p,{children:`提示中明确点名 Skill 可以减少歧义，例如：`}),`
`,(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(t.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z" fill="currentColor" /></svg>`,children:(0,n.jsx)(t.code,{children:(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`请使用 release-check Skill 检查当前版本的发布准备情况，只做分析。`})})})})}),`
`,(0,n.jsx)(t.p,{children:`如果 Skill 允许隐式调用，Agent 也可以根据描述选择它；需要稳定流程时仍建议显式选择或点名。`}),`
`,(0,n.jsx)(t.h2,{id:`更新和删除`,children:`更新和删除`}),`
`,(0,n.jsx)(t.p,{children:`有来源记录的 Skill 可以检查上游提交并更新。更新前确认来源、分支或提交仍然可信；更新后重新阅读说明、脚本和 MCP 依赖。`}),`
`,(0,n.jsx)(t.p,{children:`删除只移除已安装包。当前会话可能仍保存创建时的 Skill 身份和历史记录，但不能假设删除后正在运行的轮次会被改写。应先等待当前任务结束，再整理会话能力。`}),`
`,(0,n.jsx)(t.h2,{id:`skill-creator`,children:`Skill Creator`}),`
`,(0,n.jsx)(t.p,{children:`Skill Creator 用于创建或基于现有 Skill 分叉草稿。推荐流程：`}),`
`,(0,n.jsxs)(a,{children:[(0,n.jsx)(i,{children:`创建空白草稿，或从已安装 Skill 分叉。`}),(0,n.jsxs)(i,{children:[`编辑 `,(0,n.jsx)(t.code,{children:`SKILL.md`}),` 和需要的引用、资源、脚本文件。`]}),(0,n.jsx)(i,{children:`运行验证，修复结构错误和警告。`}),(0,n.jsx)(i,{children:`预览发布内容，确认文件列表、说明和依赖。`}),(0,n.jsx)(i,{children:`发布为可安装 Skill；不再需要的草稿可以删除。`})]}),`
`,(0,n.jsx)(t.p,{children:`验证通过只说明包结构满足规则，不代表脚本逻辑、安全性和外部依赖已经人工审查。`})]})}function s(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default,r as frontmatter,i as structuredData,a as toc};