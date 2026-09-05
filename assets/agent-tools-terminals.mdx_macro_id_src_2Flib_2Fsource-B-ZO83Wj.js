import{r as e}from"./rolldown-runtime-hePW80VL.js";import{t}from"./jsx-runtime-NZYk81nU.js";var n=e(t()),r={title:`工具与后台终端`,description:`阅读工具调用、检查输出，并管理 Agent 启动的后台命令。`,icon:`SquareTerminal`},i={contents:[{heading:void 0,content:`Agent 通过工具读取文件、修改代码、运行命令或调用应用功能。每次调用都会在消息记录中形成工具卡片，工具状态和最终回答共同构成任务结果。`},{heading:`阅读工具卡片`,content:`工具运行时会显示当前状态和实时输出；完成后卡片通常折叠，以保持会话可读。展开后可以查看：`},{heading:`阅读工具卡片`,content:`工具名称和模型提交的参数。`},{heading:`阅读工具卡片`,content:`命令、工作目录和退出状态。`},{heading:`阅读工具卡片`,content:`文件补丁及新增、修改、删除摘要。`},{heading:`阅读工具卡片`,content:`自动权限审查的结论和理由。`},{heading:`阅读工具卡片`,content:`标准输出、错误输出，以及被截断或省略的提示。`},{heading:`阅读工具卡片`,content:`工具可能处于运行、等待审批、等待用户、等待清理、成功、失败、取消或中断等状态。只有进入明确终态后，才能判断该次调用是否结束。`},{heading:`阅读工具卡片`,content:`实时输出和持久化历史都会控制体积。看到截断标记时，应让 Agent
使用更精确的过滤命令或读取指定区段，而不是假设未显示的内容不存在。`},{heading:`停止当前回答`,content:`输入框为空且当前回答可取消时，主按钮会变为停止按钮。它用于取消正在进行的 Agent 回答或独立压缩。`},{heading:`停止当前回答`,content:`停止请求发出后，应用仍需要确认工具和进程已经进入终态。界面显示等待清理时，不要立即创建替代任务；先等待或按错误提示重试清理。`},{heading:`后台终端`,content:`长时间运行的命令可以进入后台，并获得一个终端会话标识。它们属于创建它们的 Agent 会话，不会因为折叠工具卡片、切换会话或关闭 Agent 窗口而自动结束。`},{heading:`后台终端`,content:`命令`},{heading:`后台终端`,content:`作用`},{heading:`后台终端`,content:"`/ps`"},{heading:`后台终端`,content:`列出当前 Agent 会话保留的后台终端及状态`},{heading:`后台终端`,content:"`/stop`"},{heading:`后台终端`,content:`请求停止并清理当前会话的全部后台终端`},{heading:`后台终端`,content:"`/stop` 与停止当前回答不是同一个操作。前者处理后台终端，后者取消当前模型轮次或压缩。"},{heading:`安全清理后台命令`,content:`后台开发服务器、文件监听器和交互式命令可能持续占用端口或文件。任务完成前应明确说明哪些进程被保留、哪些已经停止。`},{heading:`判断任务是否完成`,content:`工具调用显示成功，只证明该操作成功，不等于整个目标已经实现。`},{heading:`判断任务是否完成`,content:`测试命令需要检查退出状态和失败用例，而不只是看到部分输出。`},{heading:`判断任务是否完成`,content:`Agent 最终回答应说明修改内容、验证结果和仍未完成的事项。`},{heading:`判断任务是否完成`,content:`如果最终回答声称完成，但工具仍在运行或等待清理，应以后端状态为准。`}],headings:[{id:`阅读工具卡片`,content:`阅读工具卡片`},{id:`停止当前回答`,content:`停止当前回答`},{id:`后台终端`,content:`后台终端`},{id:`安全清理后台命令`,content:`安全清理后台命令`},{id:`判断任务是否完成`,content:`判断任务是否完成`}]},a=[{depth:2,url:`#阅读工具卡片`,title:(0,n.jsx)(n.Fragment,{children:`阅读工具卡片`})},{depth:2,url:`#停止当前回答`,title:(0,n.jsx)(n.Fragment,{children:`停止当前回答`})},{depth:2,url:`#后台终端`,title:(0,n.jsx)(n.Fragment,{children:`后台终端`})},{depth:2,url:`#安全清理后台命令`,title:(0,n.jsx)(n.Fragment,{children:`安全清理后台命令`})},{depth:2,url:`#判断任务是否完成`,title:(0,n.jsx)(n.Fragment,{children:`判断任务是否完成`})}];function o(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...e.components},{Callout:r,Step:i,Steps:a}=t;return r||c(`Callout`,!0),i||c(`Step`,!0),a||c(`Steps`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:`Agent 通过工具读取文件、修改代码、运行命令或调用应用功能。每次调用都会在消息记录中形成工具卡片，工具状态和最终回答共同构成任务结果。`}),`
`,(0,n.jsx)(t.h2,{id:`阅读工具卡片`,children:`阅读工具卡片`}),`
`,(0,n.jsx)(t.p,{children:`工具运行时会显示当前状态和实时输出；完成后卡片通常折叠，以保持会话可读。展开后可以查看：`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`工具名称和模型提交的参数。`}),`
`,(0,n.jsx)(t.li,{children:`命令、工作目录和退出状态。`}),`
`,(0,n.jsx)(t.li,{children:`文件补丁及新增、修改、删除摘要。`}),`
`,(0,n.jsx)(t.li,{children:`自动权限审查的结论和理由。`}),`
`,(0,n.jsx)(t.li,{children:`标准输出、错误输出，以及被截断或省略的提示。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`工具可能处于运行、等待审批、等待用户、等待清理、成功、失败、取消或中断等状态。只有进入明确终态后，才能判断该次调用是否结束。`}),`
`,(0,n.jsx)(r,{title:`输出可能有保留上限`,children:(0,n.jsx)(t.p,{children:`实时输出和持久化历史都会控制体积。看到截断标记时，应让 Agent
使用更精确的过滤命令或读取指定区段，而不是假设未显示的内容不存在。`})}),`
`,(0,n.jsx)(t.h2,{id:`停止当前回答`,children:`停止当前回答`}),`
`,(0,n.jsx)(t.p,{children:`输入框为空且当前回答可取消时，主按钮会变为停止按钮。它用于取消正在进行的 Agent 回答或独立压缩。`}),`
`,(0,n.jsx)(t.p,{children:`停止请求发出后，应用仍需要确认工具和进程已经进入终态。界面显示等待清理时，不要立即创建替代任务；先等待或按错误提示重试清理。`}),`
`,(0,n.jsx)(t.h2,{id:`后台终端`,children:`后台终端`}),`
`,(0,n.jsx)(t.p,{children:`长时间运行的命令可以进入后台，并获得一个终端会话标识。它们属于创建它们的 Agent 会话，不会因为折叠工具卡片、切换会话或关闭 Agent 窗口而自动结束。`}),`
`,(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:`命令`}),(0,n.jsx)(t.th,{children:`作用`})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:`/ps`})}),(0,n.jsx)(t.td,{children:`列出当前 Agent 会话保留的后台终端及状态`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:`/stop`})}),(0,n.jsx)(t.td,{children:`请求停止并清理当前会话的全部后台终端`})]})]})]}),`
`,(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:`/stop`}),` 与停止当前回答不是同一个操作。前者处理后台终端，后者取消当前模型轮次或压缩。`]}),`
`,(0,n.jsx)(t.h2,{id:`安全清理后台命令`,children:`安全清理后台命令`}),`
`,(0,n.jsxs)(a,{children:[(0,n.jsxs)(i,{children:[`执行 `,(0,n.jsx)(t.code,{children:`/ps`}),`，确认终端属于哪个命令并检查当前状态。`]}),(0,n.jsx)(i,{children:`仍需保留服务时，先让 Agent读取增量输出确认它是否正常。`}),(0,n.jsxs)(i,{children:[`不再需要时执行 `,(0,n.jsx)(t.code,{children:`/stop`}),`。`]}),(0,n.jsxs)(i,{children:[`再次执行 `,(0,n.jsx)(t.code,{children:`/ps`}),`，确认没有保留的后台终端。`]}),(0,n.jsxs)(i,{children:[`如果提示清理失败，按照卡片提示再次执行 `,(0,n.jsx)(t.code,{children:`/stop`}),`，不要仅删除会话。`]})]}),`
`,(0,n.jsx)(t.p,{children:`后台开发服务器、文件监听器和交互式命令可能持续占用端口或文件。任务完成前应明确说明哪些进程被保留、哪些已经停止。`}),`
`,(0,n.jsx)(t.h2,{id:`判断任务是否完成`,children:`判断任务是否完成`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`工具调用显示成功，只证明该操作成功，不等于整个目标已经实现。`}),`
`,(0,n.jsx)(t.li,{children:`测试命令需要检查退出状态和失败用例，而不只是看到部分输出。`}),`
`,(0,n.jsx)(t.li,{children:`Agent 最终回答应说明修改内容、验证结果和仍未完成的事项。`}),`
`,(0,n.jsx)(t.li,{children:`如果最终回答声称完成，但工具仍在运行或等待清理，应以后端状态为准。`}),`
`]})]})}function s(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default,r as frontmatter,i as structuredData,a as toc};