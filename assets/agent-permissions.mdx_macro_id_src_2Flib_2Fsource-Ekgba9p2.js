import{r as e}from"./rolldown-runtime-BLXQ4ufn.js";import{t}from"./jsx-runtime-DsDUoChv.js";var n=e(t()),r={title:`权限与审批`,description:`选择 Agent 权限模式，并安全处理每一次工具审批。`,icon:`ShieldCheck`},i={contents:[{heading:void 0,content:"输入 `/permissions` 或打开输入框旁的权限菜单，可以查看当前会话的审批方式和命令沙箱。会话默认沿用 Agent 设置；在此处选预设只影响这次会话。"},{heading:`权限模式`,content:`会话预设`},{heading:`权限模式`,content:`命令沙箱`},{heading:`权限模式`,content:`需要审批时`},{heading:`权限模式`,content:`只读`},{heading:`权限模式`,content:`可读取文件，限制写入和联网`},{heading:`权限模式`,content:`由你决定`},{heading:`权限模式`,content:`默认`},{heading:`权限模式`,content:`可写入工作区，默认限制联网`},{heading:`权限模式`,content:`由你决定`},{heading:`权限模式`,content:`自动审批`},{heading:`权限模式`,content:`使用工作区写入沙箱`},{heading:`权限模式`,content:`由模型审查并显示理由`},{heading:`权限模式`,content:`完全开放`},{heading:`权限模式`,content:`以当前系统用户权限运行`},{heading:`权限模式`,content:`常规审批自动放行`},{heading:`权限模式`,content:"需要沙箱的预设不可用时，菜单会显示原因。Windows 上若出现“初始化 Windows 沙箱”，可直接点击并完成系统的管理员授权。也可用 `/setup-default-sandbox` 打开沙箱维护设置。"},{heading:`权限模式`,content:`有些操作会被后端直接禁止，不能通过切换权限模式覆盖。路径规则、实例生命周期、进程所有权、操作系统账号权限等约束也始终有效。`},{heading:`权限模式`,content:`选择“完全开放”后，命令可以直接修改当前用户有权访问的项目、实例或外部服务。`},{heading:`处理人工审批`,content:`审批出现时，普通输入框会切换为审批卡片。批准前逐项核对：`},{heading:`处理人工审批`,content:`操作类型：命令、文件写入、删除、MCP 管理或外部工具调用。`},{heading:`处理人工审批`,content:`风险等级：低、中、高或严重。`},{heading:`处理人工审批`,content:`操作摘要和来源：用户请求、模型判断或某个 Skill。`},{heading:`处理人工审批`,content:`准确目标：程序、参数、工作目录、文件路径或服务标识。`},{heading:`处理人工审批`,content:`这项操作是否确实是完成当前任务所必需。`},{heading:`处理人工审批`,content:`“允许一次”只授权当前请求。部分工具还提供“在此对话中允许”，这会让同一工具在该对话中后续执行时免于再次询问，直至 Agent 重启。始终要求人工决定的请求只提供单次选择。选择“拒绝”后，Agent 会收到拒绝结果。`},{heading:`自动审查怎么看`,content:`自动审查会在工具记录中显示审查状态、风险判断、用户授权线索和理由。它仍然只针对当前调用，不代表整个任务已经被授权。`},{heading:`自动审查怎么看`,content:"自动审查拒绝后，展开工具记录核对理由和目标。如果你确认要让 Agent 重试这项操作，可以输入 `/approve` 并选择对应的拒绝记录，授权一次重试。"},{heading:`高风险操作`,content:`以下操作即使目标看起来合理，也应人工确认范围和可恢复方式：`},{heading:`高风险操作`,content:`删除、覆盖或移动项目和实例数据。`},{heading:`高风险操作`,content:`重置 Git、发布版本、推送代码或触发远程工作流。`},{heading:`高风险操作`,content:`安装来源不明的 Skill、执行其脚本或修改 MCP 配置。`},{heading:`高风险操作`,content:`使用 MCP 操作账号、数据库、消息、支付或其他外部系统。`},{heading:`高风险操作`,content:`读取或发送凭据、隐私数据和未公开内容。`},{heading:`高风险操作`,content:`涉及删除时先确认备份或快照；涉及外部系统时确认账号、环境和目标对象；涉及命令时确认工作目录和完整参数。`},{heading:`权限模式与其他控制`,content:`Plan 模式下，即使选择“完全开放”，变更工具也会保持隐藏。`},{heading:`权限模式与其他控制`,content:`MCP 工具还有自己的“允许、询问、拒绝”策略，两层规则都会生效。`},{heading:`权限模式与其他控制`,content:`Skill 可以建议或调用工具，但不会继承超出当前权限的能力。`},{heading:`权限模式与其他控制`,content:`记忆只提供上下文，不授予文件、命令或外部服务权限。`}],headings:[{id:`权限模式`,content:`权限模式`},{id:`处理人工审批`,content:`处理人工审批`},{id:`自动审查怎么看`,content:`自动审查怎么看`},{id:`高风险操作`,content:`高风险操作`},{id:`权限模式与其他控制`,content:`权限模式与其他控制`}]},a=[{depth:2,url:`#权限模式`,title:(0,n.jsx)(n.Fragment,{children:`权限模式`})},{depth:2,url:`#处理人工审批`,title:(0,n.jsx)(n.Fragment,{children:`处理人工审批`})},{depth:2,url:`#自动审查怎么看`,title:(0,n.jsx)(n.Fragment,{children:`自动审查怎么看`})},{depth:2,url:`#高风险操作`,title:(0,n.jsx)(n.Fragment,{children:`高风险操作`})},{depth:2,url:`#权限模式与其他控制`,title:(0,n.jsx)(n.Fragment,{children:`权限模式与其他控制`})}];function o(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...e.components},{Callout:r}=t;return r||c(`Callout`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[`输入 `,(0,n.jsx)(t.code,{children:`/permissions`}),` 或打开输入框旁的权限菜单，可以查看当前会话的审批方式和命令沙箱。会话默认沿用 Agent 设置；在此处选预设只影响这次会话。`]}),`
`,(0,n.jsx)(t.h2,{id:`权限模式`,children:`权限模式`}),`
`,(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:`会话预设`}),(0,n.jsx)(t.th,{children:`命令沙箱`}),(0,n.jsx)(t.th,{children:`需要审批时`})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`只读`}),(0,n.jsx)(t.td,{children:`可读取文件，限制写入和联网`}),(0,n.jsx)(t.td,{children:`由你决定`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`默认`}),(0,n.jsx)(t.td,{children:`可写入工作区，默认限制联网`}),(0,n.jsx)(t.td,{children:`由你决定`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`自动审批`}),(0,n.jsx)(t.td,{children:`使用工作区写入沙箱`}),(0,n.jsx)(t.td,{children:`由模型审查并显示理由`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`完全开放`}),(0,n.jsx)(t.td,{children:`以当前系统用户权限运行`}),(0,n.jsx)(t.td,{children:`常规审批自动放行`})]})]})]}),`
`,(0,n.jsxs)(t.p,{children:[`需要沙箱的预设不可用时，菜单会显示原因。Windows 上若出现“初始化 Windows 沙箱”，可直接点击并完成系统的管理员授权。也可用 `,(0,n.jsx)(t.code,{children:`/setup-default-sandbox`}),` 打开沙箱维护设置。`]}),`
`,(0,n.jsx)(t.p,{children:`有些操作会被后端直接禁止，不能通过切换权限模式覆盖。路径规则、实例生命周期、进程所有权、操作系统账号权限等约束也始终有效。`}),`
`,(0,n.jsx)(r,{type:`warn`,title:`完全开放时命令以当前用户权限运行`,children:(0,n.jsx)(t.p,{children:`选择“完全开放”后，命令可以直接修改当前用户有权访问的项目、实例或外部服务。`})}),`
`,(0,n.jsx)(t.h2,{id:`处理人工审批`,children:`处理人工审批`}),`
`,(0,n.jsx)(t.p,{children:`审批出现时，普通输入框会切换为审批卡片。批准前逐项核对：`}),`
`,(0,n.jsxs)(t.ol,{children:[`
`,(0,n.jsx)(t.li,{children:`操作类型：命令、文件写入、删除、MCP 管理或外部工具调用。`}),`
`,(0,n.jsx)(t.li,{children:`风险等级：低、中、高或严重。`}),`
`,(0,n.jsx)(t.li,{children:`操作摘要和来源：用户请求、模型判断或某个 Skill。`}),`
`,(0,n.jsx)(t.li,{children:`准确目标：程序、参数、工作目录、文件路径或服务标识。`}),`
`,(0,n.jsx)(t.li,{children:`这项操作是否确实是完成当前任务所必需。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`“允许一次”只授权当前请求。部分工具还提供“在此对话中允许”，这会让同一工具在该对话中后续执行时免于再次询问，直至 Agent 重启。始终要求人工决定的请求只提供单次选择。选择“拒绝”后，Agent 会收到拒绝结果。`}),`
`,(0,n.jsx)(t.h2,{id:`自动审查怎么看`,children:`自动审查怎么看`}),`
`,(0,n.jsx)(t.p,{children:`自动审查会在工具记录中显示审查状态、风险判断、用户授权线索和理由。它仍然只针对当前调用，不代表整个任务已经被授权。`}),`
`,(0,n.jsxs)(t.p,{children:[`自动审查拒绝后，展开工具记录核对理由和目标。如果你确认要让 Agent 重试这项操作，可以输入 `,(0,n.jsx)(t.code,{children:`/approve`}),` 并选择对应的拒绝记录，授权一次重试。`]}),`
`,(0,n.jsx)(t.h2,{id:`高风险操作`,children:`高风险操作`}),`
`,(0,n.jsx)(t.p,{children:`以下操作即使目标看起来合理，也应人工确认范围和可恢复方式：`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`删除、覆盖或移动项目和实例数据。`}),`
`,(0,n.jsx)(t.li,{children:`重置 Git、发布版本、推送代码或触发远程工作流。`}),`
`,(0,n.jsx)(t.li,{children:`安装来源不明的 Skill、执行其脚本或修改 MCP 配置。`}),`
`,(0,n.jsx)(t.li,{children:`使用 MCP 操作账号、数据库、消息、支付或其他外部系统。`}),`
`,(0,n.jsx)(t.li,{children:`读取或发送凭据、隐私数据和未公开内容。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`涉及删除时先确认备份或快照；涉及外部系统时确认账号、环境和目标对象；涉及命令时确认工作目录和完整参数。`}),`
`,(0,n.jsx)(t.h2,{id:`权限模式与其他控制`,children:`权限模式与其他控制`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`Plan 模式下，即使选择“完全开放”，变更工具也会保持隐藏。`}),`
`,(0,n.jsx)(t.li,{children:`MCP 工具还有自己的“允许、询问、拒绝”策略，两层规则都会生效。`}),`
`,(0,n.jsx)(t.li,{children:`Skill 可以建议或调用工具，但不会继承超出当前权限的能力。`}),`
`,(0,n.jsx)(t.li,{children:`记忆只提供上下文，不授予文件、命令或外部服务权限。`}),`
`]})]})}function s(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default,r as frontmatter,i as structuredData,a as toc};