import{r as e}from"./rolldown-runtime-hePW80VL.js";import{t}from"./jsx-runtime-NZYk81nU.js";var n=e(t()),r={title:`会话管理`,description:`新建、切换、归档、恢复、删除和分叉 Agent 会话。`,icon:`MessagesSquare`},i={contents:[{heading:void 0,content:`一个 Agent 会话保存消息、工具调用、审批、模型选择和上下文状态。切换页面或重新打开应用后，可以继续查看已经持久化的记录。`},{heading:`新建和切换`,content:"点击左侧会话列表顶部的“新建”，或执行 `/new` 创建会话。应用会根据当前界面附加相关上下文，并使用当时的默认模型策略和可用能力。"},{heading:`新建和切换`,content:`会话列表会标记正在运行的会话和 Plan 模式会话。选择另一个会话不会自动停止当前任务；切换前应先确认是否仍有回答、压缩或后台终端在运行。`},{heading:`新建和切换`,content:`列表使用分页加载。会话较多时使用“加载更多”；进入长会话后，也可以在记录顶部继续加载更早的消息。`},{heading:`归档和恢复`,content:`归档用于隐藏暂时不用、但仍需要保留的会话：`},{heading:`归档和恢复`,content:`归档不会删除消息、工具历史或记忆来源关系，也不会把仍在运行的后台进程视为已停止。`},{heading:`永久删除`,content:`永久删除不可恢复。删除按钮需要再次确认，避免误触。`},{heading:`永久删除`,content:`删除前先检查：`},{heading:`永久删除`,content:`当前回答和压缩已经结束。`},{heading:`永久删除`,content:"`/ps` 不再显示该会话的后台终端。"},{heading:`永久删除`,content:`不再需要其中的消息、工具输出或记忆来源。`},{heading:`永久删除`,content:`没有依赖该会话历史的分叉关系或待清理资源。`},{heading:`永久删除`,content:`如果进程清理或会话关系尚未满足要求，后端会拒绝删除并保留数据。应先处理提示中的清理义务，再重试；不要把删除失败理解为记录已经部分移除。`},{heading:`分叉会话`,content:`分叉适合保留现有路线，同时从某个历史位置尝试另一种方案。`},{heading:`分叉会话`,content:`操作`},{heading:`分叉会话`,content:`结果`},{heading:`分叉会话`,content:"`/fork`"},{heading:`分叉会话`,content:`从当前已经提交的会话末端创建分叉`},{heading:`分叉会话`,content:`编辑历史用户消息`},{heading:`分叉会话`,content:`在该消息之前创建分叉，并把原消息恢复到输入框供修改`},{heading:`分叉会话`,content:`分叉不会覆盖或改写原会话。编辑历史消息也不会立即提交新请求：先检查恢复到输入框的内容，再发送修改后的任务。`},{heading:`分叉会话`,content:`子会话可以复用分叉点之前的历史，但之后的消息分别保存。记忆贡献也按各自会话处理，子会话不会把父会话后续内容复制为自己的来源。`},{heading:`会话配置的生效范围`,content:`当前会话记录自己的模型和推理强度；修改全局默认值不会自动替换它们。`},{heading:`会话配置的生效范围`,content:`Skills 的全局启用状态主要影响新会话；当前会话的启停变更按界面提示从下一轮生效。`},{heading:`会话配置的生效范围`,content:`MCP 连接和工具目录会变化，但每个模型采样步骤使用开始时冻结的工具计划。`},{heading:`会话配置的生效范围`,content:"记忆是否允许从该会话生成，在创建或分叉时按当时设置确定，也可以通过 `/memory` 查看。"},{heading:`会话配置的生效范围`,content:`只是想整理列表时使用归档；只有在确定不再需要历史、输出和记忆来源时才永久删除。`}],headings:[{id:`新建和切换`,content:`新建和切换`},{id:`归档和恢复`,content:`归档和恢复`},{id:`永久删除`,content:`永久删除`},{id:`分叉会话`,content:`分叉会话`},{id:`会话配置的生效范围`,content:`会话配置的生效范围`}]},a=[{depth:2,url:`#新建和切换`,title:(0,n.jsx)(n.Fragment,{children:`新建和切换`})},{depth:2,url:`#归档和恢复`,title:(0,n.jsx)(n.Fragment,{children:`归档和恢复`})},{depth:2,url:`#永久删除`,title:(0,n.jsx)(n.Fragment,{children:`永久删除`})},{depth:2,url:`#分叉会话`,title:(0,n.jsx)(n.Fragment,{children:`分叉会话`})},{depth:2,url:`#会话配置的生效范围`,title:(0,n.jsx)(n.Fragment,{children:`会话配置的生效范围`})}];function o(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...e.components},{Callout:r,Step:i,Steps:a}=t;return r||c(`Callout`,!0),i||c(`Step`,!0),a||c(`Steps`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:`一个 Agent 会话保存消息、工具调用、审批、模型选择和上下文状态。切换页面或重新打开应用后，可以继续查看已经持久化的记录。`}),`
`,(0,n.jsx)(t.h2,{id:`新建和切换`,children:`新建和切换`}),`
`,(0,n.jsxs)(t.p,{children:[`点击左侧会话列表顶部的“新建”，或执行 `,(0,n.jsx)(t.code,{children:`/new`}),` 创建会话。应用会根据当前界面附加相关上下文，并使用当时的默认模型策略和可用能力。`]}),`
`,(0,n.jsx)(t.p,{children:`会话列表会标记正在运行的会话和 Plan 模式会话。选择另一个会话不会自动停止当前任务；切换前应先确认是否仍有回答、压缩或后台终端在运行。`}),`
`,(0,n.jsx)(t.p,{children:`列表使用分页加载。会话较多时使用“加载更多”；进入长会话后，也可以在记录顶部继续加载更早的消息。`}),`
`,(0,n.jsx)(t.h2,{id:`归档和恢复`,children:`归档和恢复`}),`
`,(0,n.jsx)(t.p,{children:`归档用于隐藏暂时不用、但仍需要保留的会话：`}),`
`,(0,n.jsxs)(a,{children:[(0,n.jsx)(i,{children:`在会话列表中找到目标会话并选择归档。`}),(0,n.jsx)(i,{children:`使用“显示已归档”查看归档内容。`}),(0,n.jsx)(i,{children:`需要继续时选择恢复，会话会回到普通列表。`})]}),`
`,(0,n.jsx)(t.p,{children:`归档不会删除消息、工具历史或记忆来源关系，也不会把仍在运行的后台进程视为已停止。`}),`
`,(0,n.jsx)(t.h2,{id:`永久删除`,children:`永久删除`}),`
`,(0,n.jsx)(t.p,{children:`永久删除不可恢复。删除按钮需要再次确认，避免误触。`}),`
`,(0,n.jsx)(t.p,{children:`删除前先检查：`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`当前回答和压缩已经结束。`}),`
`,(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:`/ps`}),` 不再显示该会话的后台终端。`]}),`
`,(0,n.jsx)(t.li,{children:`不再需要其中的消息、工具输出或记忆来源。`}),`
`,(0,n.jsx)(t.li,{children:`没有依赖该会话历史的分叉关系或待清理资源。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`如果进程清理或会话关系尚未满足要求，后端会拒绝删除并保留数据。应先处理提示中的清理义务，再重试；不要把删除失败理解为记录已经部分移除。`}),`
`,(0,n.jsx)(t.h2,{id:`分叉会话`,children:`分叉会话`}),`
`,(0,n.jsx)(t.p,{children:`分叉适合保留现有路线，同时从某个历史位置尝试另一种方案。`}),`
`,(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:`操作`}),(0,n.jsx)(t.th,{children:`结果`})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:`/fork`})}),(0,n.jsx)(t.td,{children:`从当前已经提交的会话末端创建分叉`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`编辑历史用户消息`}),(0,n.jsx)(t.td,{children:`在该消息之前创建分叉，并把原消息恢复到输入框供修改`})]})]})]}),`
`,(0,n.jsx)(t.p,{children:`分叉不会覆盖或改写原会话。编辑历史消息也不会立即提交新请求：先检查恢复到输入框的内容，再发送修改后的任务。`}),`
`,(0,n.jsx)(t.p,{children:`子会话可以复用分叉点之前的历史，但之后的消息分别保存。记忆贡献也按各自会话处理，子会话不会把父会话后续内容复制为自己的来源。`}),`
`,(0,n.jsx)(t.h2,{id:`会话配置的生效范围`,children:`会话配置的生效范围`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`当前会话记录自己的模型和推理强度；修改全局默认值不会自动替换它们。`}),`
`,(0,n.jsx)(t.li,{children:`Skills 的全局启用状态主要影响新会话；当前会话的启停变更按界面提示从下一轮生效。`}),`
`,(0,n.jsx)(t.li,{children:`MCP 连接和工具目录会变化，但每个模型采样步骤使用开始时冻结的工具计划。`}),`
`,(0,n.jsxs)(t.li,{children:[`记忆是否允许从该会话生成，在创建或分叉时按当时设置确定，也可以通过 `,(0,n.jsx)(t.code,{children:`/memory`}),` 查看。`]}),`
`]}),`
`,(0,n.jsx)(r,{title:`归档与删除的区别`,children:(0,n.jsx)(t.p,{children:`只是想整理列表时使用归档；只有在确定不再需要历史、输出和记忆来源时才永久删除。`})})]})}function s(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default,r as frontmatter,i as structuredData,a as toc};