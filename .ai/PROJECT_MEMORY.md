# 项目定位

- 已验证：本仓库是基于 Mizuki 9.0 与 Astro 7.1.3 创建的全新个人网站。
- 已验证：项目使用 TypeScript、Astro 组件、Svelte 5、Tailwind CSS 4、Stylus 设计变量及 pnpm 11.5.3。
- 项目目标：在保留 Mizuki 基础能力的前提下，逐步建设为 Mxiaocao 的个人工程网站。
- 当前状态：个人身份、首页文案、About、三个真实项目展示和站点默认语言固定为简体中文，Projects 栏目名称固定翻译为“项目”；已移除语言切换器；独立首页、Writing、项目详情与 Notes 已接通，Lab 暂不作为公开页面。开发服务器限制仍按下文记录。

# 产品方向

- 网站用于记录软件项目、计算机科学学习、工程实践与实验。
- 它同时承载开发者作品集、技术文章、项目文档、工程笔记、实验作品和个人技术身份。
- 网站不局限于 ACM 归档，也不是通用营销作品集。除非用户明确决定调整，否则保留 Mizuki 现有组件和个性化功能。
- 内容优先级：项目与工程身份，其次是文章，再其次是笔记；原 Lab 实验内容后续并入项目详情。历史算法竞赛内容归入文章体系。
- 已实现的一级导航：首页、文章、项目、笔记、关于；更多保留归档、友链、特色页面及原外部链接，长菜单支持滚动。Lab 暂不作为一级导航或首页入口。
- 首页应回答 Mxiaocao 是谁、正在做什么、正在写什么以及访客可以前往哪里，不再只是按时间倒序排列文章。

# 信息架构

## 当前路由

- 已验证：`/` 由 `src/pages/index.astro` 独立生成，提供四个内容入口、三个精选项目和按发布时间排序的最近三篇文章；默认界面语言为简体中文；Projects 栏目名称固定翻译为“项目”，不提供运行时语言切换。`/writing/` 与 `/writing/[page]/` 由 `src/pages/writing/[...page].astro` 生成，继续复用原文章卡片、分类栏和布局切换。
- 已验证：旧数字分页由 `src/pages/[page].astro` 按实际页数生成，并跳转到对应 Writing 分页。静态部署使用 Astro 生成的跳转 HTML，真实 HTTP 301 取决于部署平台支持。
- 已验证：普通文章使用 `/posts/[...slug]/`，别名也生成在 `/posts/` 下。
- 已验证：可选的自定义或全局永久链接由 `src/pages/[...permalink].astro` 生成在根路径。
- 已验证：`/archive/` 是可筛选的文章时间归档。
- 已验证：`/projects/` 与 `/projects/[slug]/` 共用 `projects` 内容集合；数据仍在 `src/data/projects.ts` 编辑，经 schema 校验后渲染。项目数据已替换为 ACM-OS、Dorm Hygiene、Ledgerly；三者均标记为进行中，只提供已核实的源码链接，没有虚构演示地址。项目详情补充了来自 README、构建配置和仓库提交的当前证据说明。
- 已验证：`/notes/`、`/notes/[...slug]/` 已建立；Lab 内容模型和草稿保留，但暂不生成公开页面，方便后续并入项目详情。
- 已验证：`/about/` 与 `/friends/` 使用 `spec` 内容集合中的 Markdown/MDX。
- 已验证：模板还提供相册、追番、日记、设备、技能、时间线、AI 工具、RSS、Atom、站点地图、搜索数据和 API 路由。

## 计划中的目标结构

- 已实现基础入口：Home -> `/`，复用 Mizuki 布局；个人身份文案与项目精选仍待下一阶段完善。
- 已实现：Writing -> `/writing/`，`/archive/` 保留为完整归档；文章 `/posts/` 路径及别名不变。
- 已实现：Projects -> `/projects/` 与 `/projects/[slug]/`；统一类型、运行时校验、稳定 slug 和详情页。
- 已实现：Notes -> `/notes/`，独立 Markdown/MDX 集合，类型分为 til、debugging、reference。
- 已调整：Lab 暂不提供独立路由；其 Markdown/MDX 内容模型、类型和草稿保留，后续并入项目详情。
- 已验证：About 继续使用 `/about/` 及现有 `spec/about` 渲染流程，内容已替换为 Mxiaocao 的方向和三个真实项目。
- 已验证：旧站历史 URL 已盘点至 `migration/legacy-url-inventory.json`，包含 142 个 HTML 路径（41 篇文章、16 个实验页面、79 个列表页、6 个其他页面）。该文件是迁移数据清单，不是项目记忆。最终迁移范围和重定向目标仍待后续内容导入时确定。

# 设计方向

- 保留 Mizuki 的字体体系、颜色变量、明暗模式、卡片、动效、响应式网格、页面过渡及内容渲染习惯。
- 定制内容应自然融入 Mizuki，保持内容优先、平静、技术化、现代、个人化且易读。
- 避免整体推翻重做、照搬 Butterfly/Hexo CSS，或额外增加无必要的视觉效果和仪表盘复杂度。这不代表可以删除 Mizuki 已有功能。
- 移动端、键盘操作、语义化标题、焦点状态、对比度、减少动效、代码溢出、图片和表格均为一等要求。
- 默认保留当前个人资料、公告、标签、目录、统计、日历、分类、音乐、Pio、壁纸和其他 Mizuki 功能。只有用户明确决定后才能调整或删除。

# 技术架构

- 已验证：`astro.config.mjs` 配置静态输出、Astro/Svelte、Swup、站点地图、Astro Icon、Expressive Code、MDX、Tailwind Vite 插件、图片处理和统一 Markdown/MDX 流程。
- 已验证：`src/config/index.ts` 是配置导出边界。身份、导航、侧栏、评论、壁纸、个人资料、页脚、特效、音乐和 Markdown 行为分别位于 `src/config/` 下；`LanguageSwitch.astro` 提供简中、繁中、英文客户端切换。
- 已验证：`src/layouts/Layout.astro` 管理文档元数据、字体、全局样式、全局控件、音乐和可选 Pio。
- 已验证：`src/layouts/MainGridLayout.astro` 管理 Mizuki 页面外壳，包括导航栏、横幅、响应式网格、侧栏、主内容、目录行为和页脚。
- 已验证：可复用 UI 按 atoms、common、controls、features、layout、organisms 和 widgets 组织在 `src/components/` 下。
- 已验证：`src/styles/main.css` 是 Tailwind 4 入口；`src/styles/variables.styl` 定义明暗主题变量；布局、响应式、横幅、过渡、Markdown、组件和页面样式拆分在独立文件中。
- 已验证：`tsconfig.json` 定义了 `@/`、`@components/`、`@layouts/`、`@utils/`、`@i18n/` 等路径别名。
- 已验证：Biome 负责格式化和检查，项目也提供 Astro Check 与 TypeScript 检查命令。
- 已验证：网站采用静态生成；完整构建会生成 Pagefind 搜索索引。

# 内容模型

- 已验证：`src/content.config.ts` 定义 `posts`、`spec`、`projects`、`notes`、`lab` 五个集合；后三者使用 `src/schemas/content.ts` 的统一 schema。
- 已验证：文章是 `src/content/posts/` 下的 Markdown/MDX。必填字段为 `title` 和 `published`；还支持更新时间、草稿、描述、封面、标签、分类、语言、置顶、评论、署名、许可证、加密、别名和自定义永久链接。
- 已验证：`spec` 是 `src/content/spec/` 下无固定 schema 的 Markdown/MDX，目前用于 About 和 Friends。
- 已验证：项目、日记、设备、技能、时间线、追番和 AI 工具等结构化页面使用 `src/data/` 下的 TypeScript 数据。
- 已验证：项目记录包含稳定 id、标题、描述、图片、分类、技术栈、状态、链接、日期、精选状态、标签，以及 isDemo 和可选 sections（标题/正文段落）。ProjectInput 与 Project 从同一 schema 推导，集合加载时检查重复 id；列表保持数据文件顺序。
- 已验证：Notes/Lab 均需 title、description、published、kind，支持 updated、draft、tags；Lab 额外要求 status，可设置 demoUrl 与 sourceCode。`src/content/notes/template.md` 和 `src/content/lab/template.md` 是不公开的草稿模板，复制后修改字段即可录入内容。
- 已验证：Notes/Lab 使用共享列表与 Markdown 正文组件，公开详情参与 Pagefind；现有文章 RSS/Atom 和归档仍只处理 posts。
- 已验证：仓库包含演示文章、演示项目、演示个人资料、相册和资源，部署前需要替换。
- 计划中 Writing：Algorithms、Engineering、Devlog，并以 Archive 作为完整浏览入口。
- 已完成 Projects：ACM-OS、Dorm Hygiene、Ledgerly 作为一等项目实体；状态均为进行中，能力描述依据各自 README。
- 计划中 Notes：TIL、调试、API、命令、SQL、Rust、Linux 和工具记录。
- 计划中：将原 Lab 的实验和交互作品并入项目详情，而不是继续作为独立栏目。
- 已完成 About：个人介绍、算法与数据结构学习方向、编程之外的中英文生活文字、日常时间分配图表和网站说明；项目资料集中在 Projects 页面，联系方式仅保留已核实的 GitHub 账号。

# 重要决策

决策：`.ai/PROJECT_MEMORY.md` 是唯一的 AI 项目交接文档。
原因：后续任务需要简洁、准确且以仓库事实为依据的上下文。
影响：每次任务先读本文件，再检查任务相关代码；验证完成后更新本文件；不得建立竞争性的记忆文档。

决策：Mizuki 始终是设计和架构基线。
原因：旧 Hexo 网站只作为产品和内容参考，不作为实现模板。
影响：优先使用现有布局、组件、设计变量和配置入口，不移植旧 CSS 或主题补丁。

决策：迁移按明确阶段进行。
原因：模板现有能力较多，大范围改写会增加升级和回归风险。
影响：未经用户批准，不开始后续主要阶段。

决策：项目必须成为一等内容实体。
原因：网站的主要身份是工程实践，而不是文章标签体系。
影响：项目索引与详情现在共用经校验的内容集合，不把项目降格为文章标签；真实项目资料后续逐步录入。

决策：初期迁移保留 Mizuki 现有功能。
原因：用户要求暂时保留音乐、Pio、公告、侧栏、壁纸、特色页面及相关个性化能力。
影响：不得以“清理”为由关闭或删除这些功能。只有用户查看实际网站后明确提出，才能调整。

决策：后续工程工作使用 Git 和 GitHub 管理。
原因：需要可回溯、可审查、可协作的开发历史。
影响：`origin` 指向用户自己的公开仓库，日常分支与推送使用 `origin`；`upstream` 指向 Mizuki 官方仓库，仅用于获取上游更新。固定操作（用户于 2026-10-01 授权）：后续每项修改完成验证后创建本地 commit，便于回滚；提交前更新本文件并检查差异，只暂存本任务文件，不夹带已有无关改动。未经用户明确要求不得推送。

决策：后续涉及 Astro 或 Mizuki 的维护，优先依据 Astro 与 Mizuki 官方维护文档实施。
原因：保持项目与上游框架、主题的官方维护方式一致，减少自行推断造成的兼容性和升级风险。
影响：修改前应先查阅适用的官方文档，并按文档建议完成配置、组件、内容模型和升级相关工作；只有官方文档没有覆盖当前问题时，才可以基于仓库现状自行设计方案，并明确记录依据与限制。

# 当前仓库状态

- 已验证：`origin` 为公开仓库 `https://github.com/Mxiaocao/Mxiaocao-Blog.git`；`main` 已推送并跟踪 `origin/main`。2026-10-01 已将主分支重建为 Mxiaocao 自己的干净历史，根提交为 `ce6d4ef`；原完整历史保存在本地 `pre-clean-history` 分支，`upstream` 未改变。
- 已验证：`upstream` 为 Mizuki 官方仓库 `https://github.com/matsuzaka-yuki/Mizuki.git`；当前基线提交为 `14da4262d8aa1d93dc8cff11705f14918ed7369f`。
- 已验证：旧博客仓库已保留并改名为 `https://github.com/Mxiaocao/Mxiaocao-Blog-Legacy`。
- 已验证（2026-10-01）：Node 24.21.0、pnpm 11.5.3，依赖已安装；正常自定义字体模式下完整生产流程成功退出，生成 34 个页面，Pagefind 索引 15 个页面和 1,471 个词，样式及字体检查通过。
- 已验证（2026-10-01）：`pnpm preview --host 127.0.0.1 --port 3012` 可正常启动；首页、About、Projects 和 `/posts/guide/` 返回 HTTP 200。会话结束后服务不保证持续运行，需按命令重新启动。
- 已验证：已调整信息架构及内容入口，保留原主题与全部特色功能；站点标题、横幅、个人资料、公告和 About 已统一为 Mxiaocao；真实域名为 `https://mxiaocaoblog.com/`，已写入 `siteURL`。
- 已验证：受工作区沙箱限制，源码中的 `.vscode/extensions.json` 和 `.vscode/settings.json` 未能解压，目前显示为缺失。不得提交这两项删除。
- 已验证：`.pnpm-cache/`、`.pnpm-store/`、`.tmp/` 和 `.tools/` 是通过 `.git/info/exclude` 排除的本地环境文件，不属于产品源码，不得提交。

# 已完成工作

- 下载并校验全新 Mizuki 源码。
- 安装项目依赖。
- 通过静态构建和本地预览验证官方默认网站。
- 完成初始仓库架构调研。
- 建立唯一项目记忆文件。
- 建立 GitHub 公开仓库，补齐 Mizuki 完整 Git 历史并推送 `main`。
- 配置 `origin` 与 `upstream` 双远程工作流，并保留旧博客仓库。
- 完成 Phase 1 开发准备及历史 URL 清单（本地提交 `890af9e`）。
- 完成 Phase 2 首页/文章分页拆分、项目详情、Notes/Lab 内容集合与导航接入。

# 当前任务与下一步

- 当前任务：About 页面已按旧站信息结构重新整理为简体中文，移除项目列表，补充算法与数据结构学习方向，采用用户提供的中文生活文字，并恢复为左右布局的彩色饼图；当前比例为编程 60%、阅读 10%、码字 10%、健身 10%、旅行 5%、游戏 5%。时间轴内容按用户要求不迁移。独立 Lab 页面仍不作为公开栏目，后续实验内容并入项目详情。
- 工作仓库：`E:\03-Projects\Mxiaocao-Blog`，分支 `main`，跟踪 `origin/main`；本阶段起点为 `0ddae87`；域名更新提交在其后。两项已有 `.vscode` 删除保持未暂存，不纳入任务提交。
- 已完成：首页独立并展示三个精选项目，Writing 承担文章分页，旧数字分页兼容跳转；项目统一 schema 与详情页；Notes 的独立模型、空状态、草稿过滤及正文页；导航整理并保留原功能入口。
- 已完成：临时内容实测 Writing 第二页、旧分页跳转和 Notes/Lab 正文，测试内容已删除并重新构建；六条新页面跳转保持 Swup 单页切换，390–1440 像素视口无水平溢出，明暗主题及长菜单已检查。
- 已完成：About 页面改为 MDX 内容，移除当前项目列表和 GitHub 项目卡片，加入算法与数据结构学习方向、用户提供的中文生活文字，并通过独立 Astro 组件恢复旧站风格的左右布局彩色饼图；页面标题为“关于我”，未迁移旧站时间轴经历。
- 用户决定继续有效：先整理框架，旧内容后续慢慢导入，不追查 Hexo 源码，不把内容来源作为框架工作前置条件。
- 历史迁移数据：`migration/legacy-url-inventory.json` 来自旧站静态分支 `a4edb3d112c0eec10b40778cd9785c87d4992a87`，保留 142 个 HTML 路径；本阶段未改写历史迁移清单或批量导入旧文。

## 下一阶段建议（待开始）

1. 内容逐步导入：用现有 posts、notes、lab 与项目数据入口少量录入；按历史 URL 清单确定需要保留或重定向的链接，再扩展迁移。
2. 内容翻译与上线验收：逐篇翻译 About、Writing、Notes 内容，并确认部署平台、链接、搜索、订阅、元数据、响应式及可访问性。
确认后再发布。

# 已知问题与技术债

- 已复现（2026-10-01，Windows / Node 24.21.0 / Astro 7.1.3）：开发服务器在 Vite 初始化期间停滞。AI 环境自动后台启动在 30 秒后超时；设置 `ASTRO_DEV_BACKGROUND=1` 前台诊断后仍未就绪，日志末尾停留在 `virtual:astro:pages` 解析附近，根因尚未确定。未修改依赖源码；本次诊断进程已停止。`pnpm build` 与 `pnpm preview` 正常，可用构建加预览验证页面，热更新开发尚不可用。
- 字体检查限制：`MIZUKI_FONT_MODE=system` 使 `.astro/fonts.d.ts` 生成空的 CssVariable 联合，导致 Layout 的三个 Font 参数报 `string` 不能赋给 `never`。默认 `custom` 模式重新生成类型后，`pnpm run check` 为 0 错误、0 警告；不应把系统字体模式的结果误判为默认模式失败。
- 内容同步现已默认关闭；只有显式设置 `ENABLE_CONTENT_SYNC=true` 才开启。启用后的上游逻辑仍可能暂存或重置内容、替换目录、执行 `git add .` 并提交，因此未采用外部内容工作流前不得开启。固定任务 commit 流程不等于授权启用内容同步。
- 已添加根级文章永久链接冲突检查：预留 Writing、Projects、Notes、About 等现有一级路由，以及数字分页路径；冲突会明确中止构建。历史日期型文章路径仍允许，未来新增一级栏目应同步更新 `src/utils/route-boundaries.ts`。
- 侧栏、公告、音乐、Pio、壁纸和特色页面均有意保留。不得将它们归为无用功能，也不得在未获用户明确批准时删除。

# 验证

标准仓库命令：

```text
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm run check
pnpm run type-check
pnpm test
```

- 已验证（2026-10-01）：简体中文固定阶段的 `pnpm build` 成功退出，默认关闭内容同步，正常自定义字体模式生成 32 个页面；首页和 About 样式检查通过；Pagefind 索引 13 页、1,486 词；字体检查通过（4 个文件，128 处引用）。
- 已验证（2026-10-01）：About 文案更新后的 `pnpm run check` 通过（342 个文件，0 错误、0 警告、0 提示），`pnpm run build` 成功生成 `/about/`，About 样式与字体检查通过，Pagefind 索引 13 页、1,641 词。
- 已验证（2026-10-01）：移除 About 项目列表并恢复 Mermaid 饼图后的 `pnpm run check` 与 `pnpm run build` 通过；About 样式检查确认饼图标记存在，Pagefind 索引 13 页、1,629 词。
- 已验证（2026-10-01）：About 改为 MDX 并使用 `InterestChart.astro` 后，`pnpm run check` 通过（343 个文件，0 错误、0 警告、0 提示），`pnpm run build` 成功生成左右布局图表；英文生活段落已移除，图表比例更新为编程 60%、阅读 10%、码字 10%、健身 10%、旅行 5%、游戏 5%，About 样式、字体和 Pagefind 检查通过，索引 13 页、1,653 词。
- 已验证：`pnpm run check` 检查 344 个文件，0 错误、0 警告、0 提示；本阶段 `pnpm run type-check` 通过。`pnpm run type-check` 通过。
- 已验证：`pnpm test` 的 48 项 Node 测试和 8 项加密测试通过，包含内容模型与路由边界回归测试。
- 已验证：临时内容构建确认 `/writing/2/`、旧 `/2/` 跳转及 Notes 正文可用；草稿模板无公开页面。最终预览检查新路由及六次 Swup 页面切换；手机/桌面、明暗模式、More 菜单滚动通过。历史清单保持不变。
- 已知限制：`pnpm dev` 初始化停滞；系统字体模式的 Astro Font 类型检查限制详见上文。不得把生产预览通过描述成开发热更新已修复。

# 约束

- 后续每项任务先读本文件，再检查任务相关代码。
- 仓库事实优先于本文件；发现过时内容时应直接删除或改写。
- 涉及 Astro 或 Mizuki 的修改，必须先查阅并遵循适用的官方维护文档；文档未覆盖时才允许自行设计实现，并记录依据与限制。
- 以证据为准。未验证内容必须标记为“假设”“计划中”或“未知”。
- 采用小而可逆的修改，每次有意义的修改后都要验证。
- 检查 Git 状态和差异，保留用户无关改动；未经明确批准，不得重置、清理或改写历史。
- 不得提交密钥、`.env`、本地缓存、构建产物或本地工具链。
- 不得整体复制旧 Hexo/Butterfly 实现或 CSS。
- 不得虚构项目功能、使用数据、规模或完成状态。
- 未经明确指示，不得连续执行多个主要迁移阶段。
- 每项项目任务完成前更新本文件；压缩或改写过时内容，不追加流水账。








