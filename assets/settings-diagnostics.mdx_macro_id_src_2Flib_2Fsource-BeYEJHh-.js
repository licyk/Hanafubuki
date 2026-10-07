import{r as e}from"./rolldown-runtime-hePW80VL.js";import{t}from"./jsx-runtime-NZYk81nU.js";var n=e(t()),r={title:`诊断`,description:`生成、查看并导出应用级诊断包。`,icon:`Stethoscope`},i={contents:[{heading:void 0,content:`应用诊断适合排查首次启动、运行时准备、跨实例任务、Agent 和平台问题。单个实例的环境或维护问题，优先从实例管理中的实例诊断生成范围更小的诊断包。`},{heading:`是否包含所有实例`,content:`开启后，开始收集时会固定一份实例清单，再按顺序收集每个实例。收集期间新建的实例不会追加；某个实例无法访问、正在维护或已被替换时，会在诊断清单中记录问题，但不会丢弃已经收集的其他内容。`},{heading:`是否包含所有实例`,content:`关闭后，应用包只收集应用级配置、日志、状态、Agent 非凭据数据和应用任务等内容，生成速度更快、体积更小。`},{heading:`诊断包包含什么`,content:`应用诊断通常包含：`},{heading:`诊断包包含什么`,content:`当前全局设置和配置目录；`},{heading:`诊断包包含什么`,content:`文件日志与本次运行的内存日志；`},{heading:`诊断包包含什么`,content:`应用状态、任务活动和诊断状态；`},{heading:`诊断包包含什么`,content:`Agent 历史、记忆和非敏感 Skill 状态；`},{heading:`诊断包包含什么`,content:`开启实例收集时的实例快照、环境报告、任务和运行状态。`},{heading:`诊断包包含什么`,content:`提供商凭据文档和 MCP 凭据文档会整体排除，但其余内容不会自动遮盖或改写。路径、环境变量、命令、输出、Token 或用户数据仍可能出现在其他原始来源中。`},{heading:`诊断包包含什么`,content:"分享前解压 ZIP，检查\n`manifest.json`、日志、环境报告和任务输出，删除或遮盖不应公开的内容。只把诊断包发送给可信接收者。"},{heading:`诊断包包含什么`,content:`诊断 ZIP 没有自动保留期限，也不会随日志保留策略删除。确认不再需要后，应通过系统文件管理器清理应用诊断目录中的旧文件。`}],headings:[{id:`生成应用诊断`,content:`生成应用诊断`},{id:`是否包含所有实例`,content:`是否包含所有实例`},{id:`诊断包包含什么`,content:`诊断包包含什么`}]},a=[{depth:2,url:`#生成应用诊断`,title:(0,n.jsx)(n.Fragment,{children:`生成应用诊断`})},{depth:2,url:`#是否包含所有实例`,title:(0,n.jsx)(n.Fragment,{children:`是否包含所有实例`})},{depth:2,url:`#诊断包包含什么`,title:(0,n.jsx)(n.Fragment,{children:`诊断包包含什么`})}];function o(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...e.components},{Callout:r,Step:i,Steps:a}=t;return r||c(`Callout`,!0),i||c(`Step`,!0),a||c(`Steps`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[`应用诊断适合排查首次启动、运行时准备、跨实例任务、Agent 和平台问题。单个实例的环境或维护问题，优先从实例管理中的`,(0,n.jsx)(t.a,{href:`/docs/instance-diagnostics`,children:`实例诊断`}),`生成范围更小的诊断包。`]}),`
`,(0,n.jsx)(t.h2,{id:`生成应用诊断`,children:`生成应用诊断`}),`
`,(0,n.jsxs)(a,{children:[(0,n.jsx)(i,{children:`先复现问题，记录发生时间、操作和相关实例。`}),(0,n.jsx)(i,{children:`打开“设置 → 诊断”，决定是否开启“应用诊断中包含所有实例”。`}),(0,n.jsx)(i,{children:`点击“开始收集”，在设置窗口右下角查看进度；切换分区不会取消收集。`}),(0,n.jsx)(i,{children:`任务完成后刷新列表，检查文件名、创建时间、大小和问题数量。`}),(0,n.jsx)(i,{children:`点击“导出”把副本保存到指定位置，或点击“打开文件夹”查看应用保存的原始 ZIP。`})]}),`
`,(0,n.jsx)(t.h2,{id:`是否包含所有实例`,children:`是否包含所有实例`}),`
`,(0,n.jsx)(t.p,{children:`开启后，开始收集时会固定一份实例清单，再按顺序收集每个实例。收集期间新建的实例不会追加；某个实例无法访问、正在维护或已被替换时，会在诊断清单中记录问题，但不会丢弃已经收集的其他内容。`}),`
`,(0,n.jsx)(t.p,{children:`关闭后，应用包只收集应用级配置、日志、状态、Agent 非凭据数据和应用任务等内容，生成速度更快、体积更小。`}),`
`,(0,n.jsx)(t.h2,{id:`诊断包包含什么`,children:`诊断包包含什么`}),`
`,(0,n.jsx)(t.p,{children:`应用诊断通常包含：`}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:`当前全局设置和配置目录；`}),`
`,(0,n.jsx)(t.li,{children:`文件日志与本次运行的内存日志；`}),`
`,(0,n.jsx)(t.li,{children:`应用状态、任务活动和诊断状态；`}),`
`,(0,n.jsx)(t.li,{children:`Agent 历史、记忆和非敏感 Skill 状态；`}),`
`,(0,n.jsx)(t.li,{children:`开启实例收集时的实例快照、环境报告、任务和运行状态。`}),`
`]}),`
`,(0,n.jsx)(t.p,{children:`提供商凭据文档和 MCP 凭据文档会整体排除，但其余内容不会自动遮盖或改写。路径、环境变量、命令、输出、Token 或用户数据仍可能出现在其他原始来源中。`}),`
`,(0,n.jsx)(r,{type:`warn`,title:`导出不等于脱敏`,children:(0,n.jsxs)(t.p,{children:[`分享前解压 ZIP，检查
`,(0,n.jsx)(t.code,{children:`manifest.json`}),`、日志、环境报告和任务输出，删除或遮盖不应公开的内容。只把诊断包发送给可信接收者。`]})}),`
`,(0,n.jsx)(t.p,{children:`诊断 ZIP 没有自动保留期限，也不会随日志保留策略删除。确认不再需要后，应通过系统文件管理器清理应用诊断目录中的旧文件。`})]})}function s(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default,r as frontmatter,i as structuredData,a as toc};