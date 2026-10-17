import{r as e}from"./rolldown-runtime-hePW80VL.js";import{t}from"./jsx-runtime-NZYk81nU.js";var n=e(t()),r={title:`日志、诊断与求助`,description:`保存完整错误、生成诊断包并提交可复现的问题报告。`,icon:`FileSearch`},i={contents:[{heading:void 0,content:`高质量的问题报告应该让没有看到你屏幕的人也能还原发生了什么。只有一句“启动不了”或一张最终弹窗截图，通常不足以判断问题来自应用、实例还是 WebUI。`},{heading:`先保存原始信息`,content:`问题发生后尽快收集：`},{heading:`先保存原始信息`,content:`操作发生的日期和时间。`},{heading:`先保存原始信息`,content:`Hanafubuki 版本、操作系统和硬件平台。`},{heading:`先保存原始信息`,content:`WebUI 类型、Core 版本和实例名称。`},{heading:`先保存原始信息`,content:`复现前修改过的版本、扩展、模型、参数或环境变量。`},{heading:`先保存原始信息`,content:`当前页面的失败状态和任务中心中的完整活动输出。`},{heading:`先保存原始信息`,content:`Python traceback、命令退出码以及错误前后的日志。`},{heading:`先保存原始信息`,content:`长期保留的任务输出可能被截断或淘汰。看到截断标记时，应复制当前日志或生成诊断包，不要假设之后仍能读取相同内容。`},{heading:`阅读-python-traceback`,content:`第一条红色文字不一定是根因。启动过程可能先记录警告，之后才出现真正导致进程退出的异常；也可能一个扩展失败但 WebUI 仍然成功启动。`},{heading:`选择诊断包`,content:`类型`},{heading:`选择诊断包`,content:`适用情况`},{heading:`选择诊断包`,content:`入口`},{heading:`选择诊断包`,content:`实例诊断`},{heading:`选择诊断包`,content:`某个实例安装、启动、扩展、热补丁或环境异常`},{heading:`选择诊断包`,content:`“实例管理 → 维护 → 诊断”`},{heading:`选择诊断包`,content:`应用诊断`},{heading:`选择诊断包`,content:`应用运行环境、设置、平台、全局任务或多个实例同时异常`},{heading:`选择诊断包`,content:`“设置 → 日志与诊断”`},{heading:`选择诊断包`,content:`实例诊断以当前实例为主；应用诊断可以按设置包含所有实例。不要为了“信息更多”默认收集全部实例，先选择能覆盖问题的最小范围。`},{heading:`求助模板`,content:`“已经尝试”应写明修改了什么以及错误是否变化，不要只写“网上的方法都试过”。如果运行过删除、重装依赖或 Git 重置，也必须说明，否则维护者可能基于已经改变的环境给出错误判断。`},{heading:`选择正确的求助渠道`,content:`Hanafubuki 无法准备运行环境、管理任务、持久化设置或呈现窗口：提交给 Hanafubuki 维护者。`},{heading:`选择正确的求助渠道`,content:`WebUI Core 在已启动实例中报错：提交给对应 WebUI 项目。`},{heading:`选择正确的求助渠道`,content:`只有某个扩展或自定义节点报错：先阅读其说明，再提交给扩展作者。`},{heading:`选择正确的求助渠道`,content:`模型或工作流缺少组件、版本不匹配：联系发布者并提供所需依赖信息。`},{heading:`选择正确的求助渠道`,content:`确认问题来自 Hanafubuki 后，前往 Hanafubuki GitHub
Issues 搜索是否已有相同反馈。新建 Issue
时请使用上面的求助模板，并附上可复现步骤、完整错误和必要日志；不要公开上传包含凭据或私人数据的诊断包。`},{heading:`选择正确的求助渠道`,content:`<Card title="反馈 Hanafubuki 问题" href="https://github.com/licyk/Hanafubuki/issues" description="搜索已有问题或提交新的错误报告。" />`},{heading:`选择正确的求助渠道`,content:`<Card title="实例诊断" href="/docs/instance-diagnostics" description="收集并导出实例诊断包。" />`},{heading:`选择正确的求助渠道`,content:`<Card title="应用诊断" href="/docs/settings-diagnostics" description="配置应用级诊断范围。" />`},{heading:`选择正确的求助渠道`,content:`<Card title="日志设置" href="/docs/settings-logs" description="调整日志级别、文件和保留时间。" />`},{heading:`选择正确的求助渠道`,content:`<Card title="WebUI 上游问题" href="/docs/troubleshooting-webui" description="确认错误应提交给哪个项目。" />`}],headings:[{id:`先保存原始信息`,content:`先保存原始信息`},{id:`阅读-python-traceback`,content:`阅读 Python traceback`},{id:`选择诊断包`,content:`选择诊断包`},{id:`求助模板`,content:`求助模板`},{id:`选择正确的求助渠道`,content:`选择正确的求助渠道`}]},a=[{depth:2,url:`#先保存原始信息`,title:(0,n.jsx)(n.Fragment,{children:`先保存原始信息`})},{depth:2,url:`#阅读-python-traceback`,title:(0,n.jsx)(n.Fragment,{children:`阅读 Python traceback`})},{depth:2,url:`#选择诊断包`,title:(0,n.jsx)(n.Fragment,{children:`选择诊断包`})},{depth:2,url:`#求助模板`,title:(0,n.jsx)(n.Fragment,{children:`求助模板`})},{depth:2,url:`#选择正确的求助渠道`,title:(0,n.jsx)(n.Fragment,{children:`选择正确的求助渠道`})}];function o(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,span:`span`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...e.components},{Callout:r,Card:i,Cards:a,Step:o,Steps:s}=t;return r||c(`Callout`,!0),i||c(`Card`,!0),a||c(`Cards`,!0),o||c(`Step`,!0),s||c(`Steps`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:`高质量的问题报告应该让没有看到你屏幕的人也能还原发生了什么。只有一句“启动不了”或一张最终弹窗截图，通常不足以判断问题来自应用、实例还是 WebUI。`}),`
`,(0,n.jsx)(t.h2,{id:`先保存原始信息`,children:`先保存原始信息`}),`
`,(0,n.jsx)(t.p,{children:`问题发生后尽快收集：`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`操作发生的日期和时间。`}),`
`,(0,n.jsx)(t.li,{children:`Hanafubuki 版本、操作系统和硬件平台。`}),`
`,(0,n.jsx)(t.li,{children:`WebUI 类型、Core 版本和实例名称。`}),`
`,(0,n.jsx)(t.li,{children:`复现前修改过的版本、扩展、模型、参数或环境变量。`}),`
`,(0,n.jsx)(t.li,{children:`当前页面的失败状态和任务中心中的完整活动输出。`}),`
`,(0,n.jsx)(t.li,{children:`Python traceback、命令退出码以及错误前后的日志。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`长期保留的任务输出可能被截断或淘汰。看到截断标记时，应复制当前日志或生成诊断包，不要假设之后仍能读取相同内容。`}),`
`,(0,n.jsx)(t.h2,{id:`阅读-python-traceback`,children:`阅读 Python traceback`}),`
`,(0,n.jsxs)(s,{children:[(0,n.jsxs)(o,{children:[`找到最后一段 `,(0,n.jsx)(t.code,{children:`Traceback (most recent call last):`}),`。`]}),(0,n.jsx)(o,{children:`沿调用路径查看文件属于 Core、扩展、自定义节点还是 Python 包。`}),(0,n.jsxs)(o,{children:[`记录最后的异常类型和描述，例如 `,(0,n.jsx)(t.code,{children:`ImportError`}),` 或 `,(0,n.jsx)(t.code,{children:`RuntimeError`}),`。`]}),(0,n.jsx)(o,{children:`搜索时组合异常描述、WebUI 名称、扩展名和版本；求助时保留完整 traceback。`})]}),`
`,(0,n.jsx)(t.p,{children:`第一条红色文字不一定是根因。启动过程可能先记录警告，之后才出现真正导致进程退出的异常；也可能一个扩展失败但 WebUI 仍然成功启动。`}),`
`,(0,n.jsx)(t.h2,{id:`选择诊断包`,children:`选择诊断包`}),`
`,(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:`类型`}),(0,n.jsx)(t.th,{children:`适用情况`}),(0,n.jsx)(t.th,{children:`入口`})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`实例诊断`}),(0,n.jsx)(t.td,{children:`某个实例安装、启动、扩展、热补丁或环境异常`}),(0,n.jsx)(t.td,{children:`“实例管理 → 维护 → 诊断”`})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:`应用诊断`}),(0,n.jsx)(t.td,{children:`应用运行环境、设置、平台、全局任务或多个实例同时异常`}),(0,n.jsx)(t.td,{children:`“设置 → 日志与诊断”`})]})]})]}),`
`,(0,n.jsx)(t.p,{children:`实例诊断以当前实例为主；应用诊断可以按设置包含所有实例。不要为了“信息更多”默认收集全部实例，先选择能覆盖问题的最小范围。`}),`
`,(0,n.jsx)(t.h2,{id:`求助模板`,children:`求助模板`}),`
`,(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(t.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z" fill="currentColor" /></svg>`,children:(0,n.jsxs)(t.code,{children:[(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`问题：一句话描述实际结果和期望结果`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`Hanafubuki 版本：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`操作系统与硬件：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`WebUI 类型与 Core 版本：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`实例名称：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`复现步骤：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`1.`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`2.`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`3.`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`最近改动：扩展 / 模型 / PyTorch / 启动参数 / 更新`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`首次错误时间：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`核心异常：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`完整日志或诊断包：`})}),`
`,(0,n.jsx)(t.span,{className:`line`,children:(0,n.jsx)(t.span,{children:`已经尝试的操作及结果：`})})]})})}),`
`,(0,n.jsx)(t.p,{children:`“已经尝试”应写明修改了什么以及错误是否变化，不要只写“网上的方法都试过”。如果运行过删除、重装依赖或 Git 重置，也必须说明，否则维护者可能基于已经改变的环境给出错误判断。`}),`
`,(0,n.jsx)(t.h2,{id:`选择正确的求助渠道`,children:`选择正确的求助渠道`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`Hanafubuki 无法准备运行环境、管理任务、持久化设置或呈现窗口：提交给 Hanafubuki 维护者。`}),`
`,(0,n.jsx)(t.li,{children:`WebUI Core 在已启动实例中报错：提交给对应 WebUI 项目。`}),`
`,(0,n.jsx)(t.li,{children:`只有某个扩展或自定义节点报错：先阅读其说明，再提交给扩展作者。`}),`
`,(0,n.jsx)(t.li,{children:`模型或工作流缺少组件、版本不匹配：联系发布者并提供所需依赖信息。`}),`
`]}),`
`,(0,n.jsx)(r,{title:`反馈 Hanafubuki 问题`,children:(0,n.jsxs)(t.p,{children:[`确认问题来自 Hanafubuki 后，前往 `,(0,n.jsx)(t.a,{href:`https://github.com/licyk/Hanafubuki/issues`,children:`Hanafubuki GitHub
Issues`}),` 搜索是否已有相同反馈。新建 Issue
时请使用上面的求助模板，并附上可复现步骤、完整错误和必要日志；不要公开上传包含凭据或私人数据的诊断包。`]})}),`
`,(0,n.jsxs)(a,{children:[(0,n.jsx)(i,{title:`反馈 Hanafubuki 问题`,href:`https://github.com/licyk/Hanafubuki/issues`,description:`搜索已有问题或提交新的错误报告。`}),(0,n.jsx)(i,{title:`实例诊断`,href:`/docs/instance-diagnostics`,description:`收集并导出实例诊断包。`}),(0,n.jsx)(i,{title:`应用诊断`,href:`/docs/settings-diagnostics`,description:`配置应用级诊断范围。`}),(0,n.jsx)(i,{title:`日志设置`,href:`/docs/settings-logs`,description:`调整日志级别、文件和保留时间。`}),(0,n.jsx)(i,{title:`WebUI 上游问题`,href:`/docs/troubleshooting-webui`,description:`确认错误应提交给哪个项目。`})]})]})}function s(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default,r as frontmatter,i as structuredData,a as toc};