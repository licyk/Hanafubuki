import{r as e}from"./rolldown-runtime-hePW80VL.js";import{t}from"./jsx-runtime-NZYk81nU.js";var n=e(t()),r={title:`权限与审批`,description:`选择 Agent 权限模式，并安全处理每一次工具审批。`,icon:`ShieldCheck`},i={contents:[{heading:void 0,content:`权限系统会根据操作类型、风险、来源和准确目标决定是否允许工具调用。权限模式是全局界面选择，但每次授权只针对审批卡片中显示的那一个操作。`},{heading:`权限模式`,content:`模式`},{heading:`权限模式`,content:`行为`},{heading:`权限模式`,content:`建议用途`},{heading:`权限模式`,content:`手动`},{heading:`权限模式`,content:`需要审批的操作等待用户选择“允许一次”或“拒绝”`},{heading:`权限模式`,content:`陌生项目、高风险任务和首次使用`},{heading:`权限模式`,content:`自动审查`},{heading:`权限模式`,content:`应用对需要审查的调用进行自动评估，并显示结论和理由`},{heading:`权限模式`,content:`日常开发、文档和可回滚修改`},{heading:`权限模式`,content:`完全访问`},{heading:`权限模式`,content:`自动允许原本需要审查的操作，不再弹出逐项确认`},{heading:`权限模式`,content:`只用于可信环境、明确范围和可恢复任务`},{heading:`权限模式`,content:`有些操作会被后端直接禁止，不能通过切换权限模式覆盖。路径规则、实例生命周期、进程所有权、操作系统账号权限等约束也始终有效。`},{heading:`权限模式`,content:`完全访问下，工具以应用进程实际拥有的系统权限工作。它不是临时目录或模拟环境，错误命令可能直接修改项目、实例或外部服务。`},{heading:`处理人工审批`,content:`审批出现时，普通输入框会切换为审批卡片。批准前逐项核对：`},{heading:`处理人工审批`,content:`操作类型：命令、文件写入、删除、MCP 管理或外部工具调用。`},{heading:`处理人工审批`,content:`风险等级：低、中、高或严重。`},{heading:`处理人工审批`,content:`操作摘要和来源：用户请求、模型判断或某个 Skill。`},{heading:`处理人工审批`,content:`准确目标：程序、参数、工作目录、文件路径或服务标识。`},{heading:`处理人工审批`,content:`这项操作是否确实是完成当前任务所必需。`},{heading:`处理人工审批`,content:`选择“允许一次”只授权当前请求，不会把同类操作永久加入白名单。选择“拒绝”后，Agent 会收到拒绝结果，可以调整方案或向你解释为何需要该操作。`},{heading:`自动审查怎么看`,content:`自动审查会在工具记录中显示审查状态、风险判断、用户授权线索和理由。它仍然只针对当前调用，不代表整个任务已经被授权。`},{heading:`自动审查怎么看`,content:`如果自动审查失败、超时或判断为拒绝，操作不会执行。此时应查看工具卡片中的理由，而不是反复提交相同调用。`},{heading:`高风险操作`,content:`以下操作即使目标看起来合理，也应人工确认范围和可恢复方式：`},{heading:`高风险操作`,content:`删除、覆盖或移动项目和实例数据。`},{heading:`高风险操作`,content:`重置 Git、发布版本、推送代码或触发远程工作流。`},{heading:`高风险操作`,content:`安装来源不明的 Skill、执行其脚本或修改 MCP 配置。`},{heading:`高风险操作`,content:`使用 MCP 操作账号、数据库、消息、支付或其他外部系统。`},{heading:`高风险操作`,content:`读取或发送凭据、隐私数据和未公开内容。`},{heading:`高风险操作`,content:`涉及删除时先确认备份或快照；涉及外部系统时确认账号、环境和目标对象；涉及命令时确认工作目录和完整参数。`},{heading:`权限模式与其他控制`,content:`Plan 模式仍会隐藏变更工具，完全访问不会绕过它。`},{heading:`权限模式与其他控制`,content:`MCP 工具还有自己的“允许、询问、拒绝”策略，两层规则都会生效。`},{heading:`权限模式与其他控制`,content:`Skill 可以建议或调用工具，但不会继承超出当前权限的能力。`},{heading:`权限模式与其他控制`,content:`记忆只提供上下文，不授予文件、命令或外部服务权限。`}],headings:[{id:`权限模式`,content:`权限模式`},{id:`处理人工审批`,content:`处理人工审批`},{id:`自动审查怎么看`,content:`自动审查怎么看`},{id:`高风险操作`,content:`高风险操作`},{id:`权限模式与其他控制`,content:`权限模式与其他控制`}]},a=[{depth:2,url:`#权限模式`,title:(0,n.jsx)(n.Fragment,{children:`权限模式`})},{depth:2,url:`#处理人工审批`,title:(0,n.jsx)(n.Fragment,{children:`处理人工审批`})},{depth:2,url:`#自动审查怎么看`,title:(0,n.jsx)(n.Fragment,{children:`自动审查怎么看`})},{depth:2,url:`#高风险操作`,title:(0,n.jsx)(n.Fragment,{children:`高风险操作`})},{depth:2,url:`#权限模式与其他控制`,title:(0,n.jsx)(n.Fragment,{children:`权限模式与其他控制`})}];function o(e){let t={h2:`h2`,li:`li`,ol:`ol`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...e.components},{Callout:r}=t;return r||c(`Callout`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:`权限系统会根据操作类型、风险、来源和准确目标决定是否允许工具调用。权限模式是全局界面选择，但每次授权只针对审批卡片中显示的那一个操作。`}),`
`,(0,n.jsx)(t.h2,{id:`权限模式`,children:`权限模式`}),`
`,(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:`模式`}),(0,n.jsx)(t.th,{children:`行为`}),(0,n.jsx)(t.th,{children:`建议用途`})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`手动`}),(0,n.jsx)(t.td,{children:`需要审批的操作等待用户选择“允许一次”或“拒绝”`}),(0,n.jsx)(t.td,{children:`陌生项目、高风险任务和首次使用`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`自动审查`}),(0,n.jsx)(t.td,{children:`应用对需要审查的调用进行自动评估，并显示结论和理由`}),(0,n.jsx)(t.td,{children:`日常开发、文档和可回滚修改`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`完全访问`}),(0,n.jsx)(t.td,{children:`自动允许原本需要审查的操作，不再弹出逐项确认`}),(0,n.jsx)(t.td,{children:`只用于可信环境、明确范围和可恢复任务`})]})]})]}),`
`,(0,n.jsx)(t.p,{children:`有些操作会被后端直接禁止，不能通过切换权限模式覆盖。路径规则、实例生命周期、进程所有权、操作系统账号权限等约束也始终有效。`}),`
`,(0,n.jsx)(r,{type:`warn`,title:`完全访问不提供操作系统沙箱`,children:(0,n.jsx)(t.p,{children:`完全访问下，工具以应用进程实际拥有的系统权限工作。它不是临时目录或模拟环境，错误命令可能直接修改项目、实例或外部服务。`})}),`
`,(0,n.jsx)(t.h2,{id:`处理人工审批`,children:`处理人工审批`}),`
`,(0,n.jsx)(t.p,{children:`审批出现时，普通输入框会切换为审批卡片。批准前逐项核对：`}),`
`,(0,n.jsxs)(t.ol,{children:[`
`,(0,n.jsx)(t.li,{children:`操作类型：命令、文件写入、删除、MCP 管理或外部工具调用。`}),`
`,(0,n.jsx)(t.li,{children:`风险等级：低、中、高或严重。`}),`
`,(0,n.jsx)(t.li,{children:`操作摘要和来源：用户请求、模型判断或某个 Skill。`}),`
`,(0,n.jsx)(t.li,{children:`准确目标：程序、参数、工作目录、文件路径或服务标识。`}),`
`,(0,n.jsx)(t.li,{children:`这项操作是否确实是完成当前任务所必需。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`选择“允许一次”只授权当前请求，不会把同类操作永久加入白名单。选择“拒绝”后，Agent 会收到拒绝结果，可以调整方案或向你解释为何需要该操作。`}),`
`,(0,n.jsx)(t.h2,{id:`自动审查怎么看`,children:`自动审查怎么看`}),`
`,(0,n.jsx)(t.p,{children:`自动审查会在工具记录中显示审查状态、风险判断、用户授权线索和理由。它仍然只针对当前调用，不代表整个任务已经被授权。`}),`
`,(0,n.jsx)(t.p,{children:`如果自动审查失败、超时或判断为拒绝，操作不会执行。此时应查看工具卡片中的理由，而不是反复提交相同调用。`}),`
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
`,(0,n.jsx)(t.li,{children:`Plan 模式仍会隐藏变更工具，完全访问不会绕过它。`}),`
`,(0,n.jsx)(t.li,{children:`MCP 工具还有自己的“允许、询问、拒绝”策略，两层规则都会生效。`}),`
`,(0,n.jsx)(t.li,{children:`Skill 可以建议或调用工具，但不会继承超出当前权限的能力。`}),`
`,(0,n.jsx)(t.li,{children:`记忆只提供上下文，不授予文件、命令或外部服务权限。`}),`
`]})]})}function s(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default,r as frontmatter,i as structuredData,a as toc};