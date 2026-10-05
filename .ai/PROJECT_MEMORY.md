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

- 已验证：`/` 由 `src/pages/index.astro` 独立生成，提供四个内容入口、三个精选项目和按发布时间排序的最近文章；无文章时显示空状态。默认界面语言为简体中文；Projects 栏目名称固定翻译为“项目”，不提供运行时语言切换。`/writing/` 与 `/writing/[page]/` 由 `src/pages/writing/[...page].astro` 生成，无文章时保留空状态页面。
- 已验证：旧数字分页由 `src/pages/[page].astro` 按实际页数生成，并跳转到对应 Writing 分页。静态部署使用 Astro 生成的跳转 HTML，真实 HTTP 301 取决于部署平台支持。
- 已验证：普通文章使用 `/posts/[...slug]/`，别名也生成在 `/posts/` 下。
- 已验证：可选的自定义或全局永久链接由 `src/pages/[...permalink].astro` 生成在根路径。
- 已验证：`/archive/` 是可筛选的文章时间归档。
- 已验证：`/map/` 为“更多”中的足迹地图；`/map/view/` 是嵌入地图及独立展开入口，标记 noindex，地图数据在 `src/data/footprints.json`。
- 已验证：`/projects/` 与 `/projects/[slug]/` 共用 `projects` 内容集合；`src/data/projects.ts` 保留 ACM-OS、Dorm Hygiene、Ledgerly 三个进行中的精选项目，并导入 `src/data/physics-projects.ts` 中的“交互式物理实验室”合集项目（共 4 个项目）。合集标注“学习实践”，详情集中展示六个实验，点击直接打开实验；六个旧单项详情地址跳转到合集相应锚点。原有三个软件项目没有虚构演示地址。
- 已验证：`/notes/`、`/notes/[...slug]/` 已建立；Lab 内容模型和草稿保留，但暂不生成公开页面，方便后续并入项目详情。
- 已验证：`/about/` 与 `/friends/` 使用 `spec` 内容集合中的 Markdown/MDX。
- 已验证：`/books/` 已替代追番入口，导航名称为“读书”，旧 `/anime/` 生成静态跳转至 `/books/`。模板还提供相册、日记、设备、技能、时间线、AI 工具、RSS、Atom、站点地图、搜索数据和 API 路由。

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
- 默认保留当前个人资料、公告、目录、统计、日历、分类、音乐、Pio、壁纸和其他 Mizuki 功能；文章标签侧栏在内容初始化阶段关闭。只有用户明确决定后才能调整或删除。

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
- 已验证：项目、日记、设备、技能、时间线、书籍和 AI 工具等结构化页面使用 `src/data/` 下的 TypeScript 数据。书籍在 `src/data/books.ts` 录入，必填 id、书名、作者与在读/已读/想读状态，可选封面、简介/感想、出版社、出版年份、评分、页数进度、阅读日期、标签和详情链接；当前列表为空。
- 已验证：项目记录包含稳定 id、标题、描述、图片、分类、技术栈、状态、链接、可选日期、精选状态、标签，以及 isDemo、embedDemo、experiments 实验入口数组和可选 sections（标题/正文段落）。liveDemo 支持 HTTP(S) 或站内路径；开始日期不详时省略，详情不显示日期。ProjectInput 与 Project 从同一 schema 推导，集合加载时检查重复 id；列表保持数据文件顺序。
- 已验证：Notes/Lab 均需 title、description、published、kind，支持 updated、draft、tags；Lab 额外要求 status，可设置 demoUrl 与 sourceCode。`src/content/notes/template.md` 和 `src/content/lab/template.md` 是不公开的草稿模板，复制后修改字段即可录入内容。
- 已验证：Notes/Lab 使用共享列表与 Markdown 正文组件，公开详情参与 Pagefind；现有文章 RSS/Atom 和归档仍只处理 posts。
- 已验证：模板文章已在内容初始化阶段清理，之后逐步导入历史文章；项目与个人资料保留。2026-10-03 已清空友链、追番、随笔、技能、时间线、AI 工具的示例数据，并移除四个示例相册目录（含隐藏与加密示例），保留相册 README 和页面功能。
- 计划中 Writing：Algorithms、Engineering、Devlog，并以 Archive 作为完整浏览入口。
- 已完成 Projects：ACM-OS、Dorm Hygiene、Ledgerly 作为一等项目实体；状态均为进行中，能力描述依据各自 README。
- 计划中 Notes：TIL、调试、API、命令、SQL、Rust、Linux 和工具记录。
- 已完成（2026-10-04）：旧站 Lab 的六个物理实验已合并为“交互式物理实验室”，原 `/physics-lab/` 索引跳转至 `/projects/physics-lab/`。用户最终限定本次范围为物理实验；算法演示保留在原文章中。
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
影响：`origin` 指向用户自己的公开仓库，日常分支与推送使用 `origin`；`upstream` 指向 Mizuki 官方仓库，仅用于获取上游更新。用户最新要求（2026-10-04）：未经明确要求，不得提交或推送。任务完成后更新本文件并检查差异，保留已有无关改动；此前每项任务自动创建本地 commit 的授权已被此要求替代。

决策：后续涉及 Astro 或 Mizuki 的维护，优先依据 Astro 与 Mizuki 官方维护文档实施。
原因：保持项目与上游框架、主题的官方维护方式一致，减少自行推断造成的兼容性和升级风险。
影响：修改前应先查阅适用的官方文档，并按文档建议完成配置、组件、内容模型和升级相关工作；只有官方文档没有覆盖当前问题时，才可以基于仓库现状自行设计方案，并明确记录依据与限制。

决策：继续使用 Mizuki 作为本站主题，暂不迁移到 Shirone。
原因：当前网站已经完成首页、About、Projects、内容初始化和多项 Mizuki 特色功能定制；Shirone 是独立的 Astro 7 主题，不是 Mizuki 的官方后继版本，迁移会引入新的配置、内容模型和视觉适配成本。
影响：后续维护继续以 Mizuki 官方文档和本地项目文档为准；Shirone 仅作为设计和主题维护方式的参考，除非用户另行决定，不引入其代码或 npm 包。

决策：正式内容录入前先初始化站点内容状态。
原因：模板文章、标签和旧统计会把演示数据混入个人网站，影响后续内容管理和访客认知。
影响：清空 `src/content/posts/` 中的模板文章，保留文章集合和空状态页面；关闭文章标签侧栏和空分类导航条；站点起始日期重设为 2026-10-01，文章数、分类数、标签数和总字数从空集合重新计算。

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

- 文章发布准备（2026-10-05）：用户要求发布 Lab03 并放入计算机系统原理；已录入 `src/content/posts/engineering/computer-systems/lab03.md`，标题“实验三：数据的机器表示”，分类为“技术学习 / 计算机基础 / 计算机系统原理”，发布日期 2026-10-05。依本地 Mizuki 内容编写指南补充 Frontmatter，迁入两张原图至 `public/images/posts/computer-systems/lab03/`，将原稿 LaTeX 括号分隔符适配为站点支持的美元分隔符，保留正文措辞。使用本地 Node 22.22.2 与 ASTRO_TELEMETRY_DISABLED=1 构建 81 页，样式/字体检查及 Pagefind（47 页）通过；文章 211 处 KaTeX、正文结尾、图片与源文件一致性、Writing/RSS/站点地图均通过检查。正式路径 `/posts/engineering/computer-systems/lab03/`；提交推送受阻：沙箱拒绝写入 `.git/index.lock`，Git 暂存的提权请求又因自动审批模型 `codex-auto-review` 不可用（404）未执行；因此尚未提交、推送或确认线上发布，需用户在本地终端执行明确路径的 git add/commit/push。系统 pnpm 在本环境无输出，本地 Node 22 CLI 可用；Git 读取远端使用单次 `-c http.sslBackend=openssl` 成功。

- 文章录入（2026-10-04）：用户要求部署课程笔记 Lab01-02.md，已原文导入 `src/content/posts/engineering/computer-systems/lab01-02.md`，标题为“实验一、二：实验环境搭建与 Linux 基础”，发布日为本次录入日，归入“技术学习 / 计算机基础 / 计算机系统原理”。依据 Mizuki 本地 `docs/CONTENT_AUTHORING.zh.md` 补充 Frontmatter；正文与源文件逐字一致，无外部图片附件。生产构建 80 页、样式/字体检查及 Pagefind（46 页）通过；新文章正文结尾、17 张表格、分类、Writing/RSS/站点地图均已核对。正式地址为 `/posts/engineering/computer-systems/lab01-02/`；上线仍需成功提交推送并由 Zeabur 部署。

- 默认外观微调（2026-10-04）：用户随后决定手机端默认壁纸也使用横幅模式。`mobileDefaultMode` 已改为 `banner`，壁纸配置版本升级为 responsive-v3 以清除此前 responsive-v2 产生的缓存默认值；手动选择仍保留。

- 默认外观调整（2026-10-04）：用户要求电脑默认色相 360、横幅模式，手机默认全屏。`siteConfig.themeColor.hue=360`，wallpaperMode 默认 banner，新增 mobileDefaultMode=fullscreen；按设置面板现有 768px 分界，同步壁纸内联初始化、GridScripts、设置读取和恢复默认，断点变化时更新默认模式。版本 responsive-v2 一次性清理旧壁纸缓存，后续保留手动选择；色相迁移仅清除旧值 240，其他自选值保留。参考本地 Mizuki 组件架构文档并沿用既有 define:vars 方式；Astro 在线脚本文档本次网络读取失败。79 页构建通过，Edge 实测 1400/769px 横幅、390/768px 全屏，默认色相均 360，手动选择无壁纸后刷新保留。尚未提交或推送。
- 上线进展（2026-10-04）：用户已反馈修复后新版服务 Running，截图确认 `mxiaocaoblog.com` 绿色绑定至 `mxiaocao-blog-astro:8080`。真实页面的完整上线验收尚未完成。

- Zeabur 启动修复（2026-10-04）：新版服务 `mxiaocao-blog-astro` 已创建，用户提供运行日志确认 Caddy 的 zeaburextension 因 `parse headers: invalid header line: ! Cache-Control` 启动失败。已修改 `public/_headers`，移除不支持的删除指令和全站通配缓存规则；仅指纹资源 `/_astro/*` 使用一年 immutable，固定路径 assets/pio/images 改为一小时并重新验证，移除可能与目录规则叠加的 woff2 通配规则；RSS/Atom 跨域头保留。依据是平台实际解析错误与 HTTP 缓存规则，未改 Astro 配置。79 页构建、生成文件与源文件一致性、响应头基本语法、样式/字体及 Pagefind 检查通过；云端启动仍待用户推送后验证。本地 Git 权限/自动审批服务限制仍未解决，修复尚未提交推送。

- 推送准备（2026-10-04）：用户已明确授权本次提交与推送到仓库。类型检查 357 文件无错误/警告/提示，Astro 构建 79 页、样式/字体检查与 Pagefind（45 页）通过，物理/地图/图论/凸包 19 项测试通过；物理合集 featured 测试已按用户此前要求改为 true。扫描 Git 可收录文件未发现本地两个高德配置值，`.env`、构建产物与本地工具均被忽略；两项 `.vscode` 删除仍须排除。用户随后在本地终端完成提交与推送：`26cd138`（152 个文件）及此前 28 个提交已推送至 `origin/main`，终端确认 `b534f25..26cd138 main -> main`。GitHub 提示壁纸视频 57.93 MB 超过建议的 50 MB，但推送成功；后续可单独优化媒体存储。此前代理 Git 提权因自动审批模型不可用（404）受阻。
- 已确认上线环境（用户说明及 Zeabur 截图）：域名注册商为阿里云；旧服务 `mxiaocao-blog` 位于 Zeabur 腾讯云香港 2C 2GB，来源 `Mxiaocao/Mxiaocao-Blog-Legacy` 的 main，根目录 `/`，Running 1/1；正式域名 `mxiaocaoblog.com` 与 `mxiaocao.zeabur.app` 均显示 PROVISIONED。DNS 托管商尚未独立确认。计划在同一项目新增新版服务、临时域名验收后切换正式域名，尚未创建或切换。

- 当前阶段（2026-10-04）：用户明确开始域名与网站上线工作。已核对正式域名配置为 `https://mxiaocaoblog.com/`，页脚已有备案号；域名注册商、DNS 托管商、当前线上托管平台与本次部署目标仍未知，需补齐后确定接入方案。仓库同时存在 Vercel 配置与发布至 `pages` 分支的 GitHub Actions，不能据此认定实际部署平台。上线前需检查 Actions 的 Node 20 与当前工具链兼容性、地图构建环境变量，以及 Vercel 全局 `X-Frame-Options: DENY` 对站内地图和算法 iframe 的影响。继续遵守未经明确要求不提交或推送的约束。

- 已完成（2026-10-04）：修正文章底部许可证卡片显示旧站网址的问题。`src/components/misc/License.astro` 现在始终使用当前文章的 `Astro.url`，不再被迁移文章遗留的 `sourceLink` 覆盖；生产构建生成的文章 URL 已核对为 `/posts/.../` 当前路径。Astro Check 357 个文件通过，0 错误/警告/提示。旧 `sourceLink` 字段暂保留用于兼容内容 schema，但不再决定页面底部网址。

- 已完成（2026-10-04）：用户要求将交互式物理实验室加入首页精选项目，`src/data/physics-projects.ts` 设为 `featured: true`；首页现展示四个精选项目，沿用两列卡片布局。构建 79 页通过，并核对生成首页精选区域包含物理实验室标题与详情链接。此项取代此前首页仅展示三个软件项目的安排，未提交或推送。

- 已调整（2026-10-04）：按用户提供的月亮海面图片更换作者头像，原图复制至 `src/assets/images/avatar-moon.jpg`，`src/config/profileConfig.ts` 的 avatar 指向该图片，供个人资料与文章分享头像共用。未提交或推送。

- 已完成（2026-10-04）：按用户要求，“更多”菜单除归档外全部接入评论；新增读书、相册列表及相册详情、技能、时间线、AI 工具页面的 Giscus 评论区，友链、随笔、足迹地图沿用现有评论。Astro Check 357 文件无错误/警告/提示，构建 79 页成功；核对菜单 8 个非归档页面均只有一个评论容器，归档为零。相册详情当前无生成内容，模板已通过类型检查。远程评论加载未实测，未提交或推送。

- 已完成（2026-10-04）：项目列表与详情、足迹地图、笔记列表与详情、随笔列表与详情底部接入现有 Giscus 评论组件。笔记的 SectionIndex/SectionEntry 增加 comments 命名插槽，将评论放在正文卡片外。沿用 pathname 映射。Astro Check 357 文件无错误/警告/提示，构建 79 页成功；核对 7 个生成页面各有一个评论容器和正确分类配置。当前无已发布笔记详情，详情模板通过类型检查；远程评论加载未实测。未提交或推送。

- 已调整（2026-10-04）：针对地图仅显示标记、灰色底图与空间过窄的问题，恢复旧站默认底图，移除新增的 mapStyle/setMapStyle（界面控件仍同步明暗）；SDK 构造成功不再当作底图加载成功，改为监听地图 complete/error 与 15 秒超时，提供加载提示和重试按钮，并清理监听。仅地图页通过 :has 局部布局让主体占整行；用户后续明确要求地图页不保留侧栏，现仅在地图页隐藏左右侧栏；用户随后要求去掉“新窗口展开地图”，地图页仅保留嵌入式地图，桌面 iframe 改为 720px、手机 1080px。构建 79 页，Astro Check 357 文件 0 错误/警告/提示；地图测试 4 项通过，包含底图超时/完成/异常/清理。Edge 使用 headless + in-process-gpu 可在沙箱启动，实测 1400px 地图宽 1303px；侧栏隐藏调整后构建 79 页通过，Edge 验证地图页左右侧栏均为 display:none，而项目页左右侧栏正常显示，390px 无横向溢出；断网时标签筛选、灵隐 8 张照片、灯箱与 3 条路线列表切换通过。高德网络请求返回 ERR_NETWORK_ACCESS_DENIED；联网诊断升级请求因自动审批服务模型不可用未执行，未确认用户浏览器灰底的远程根因或已经恢复。已确认本地 Key 与安全码匹配旧站；需用户刷新并反馈嵌入地图是否正常；不需要用户登录高德，优先检查高德 Key 的域名白名单、安全码和配额。截图在 `.tmp/map-fixed-*.png`。未提交或推送。

- 已完成（2026-10-04）：旧站足迹地图迁入本站 `/map/`，在“更多”中新增“足迹地图”入口（相册之后）。从旧站快照 `a4edb3d112c0eec10b40778cd9785c87d4992a87` 保留 28 个地点、3 条路线和 62 张照片（约 68 MB）；地点数据在 `src/data/footprints.json`，照片原路径为 `public/img/`，迁移记录在 `migration/footprints.json`。Mizuki 页面通过 `/map/view/` 独立框架加载地图专用 JS/CSS，未导入 Butterfly 页面外壳；支持标签/年份筛选、多次到访照片、照片放大、路线播放和重置，单点路线仍按原数据保留。原高德浏览器配置已写入忽略提交的本地 `.env`；部署环境需设置 `AMAP_JS_KEY` 与 `AMAP_SECURITY_JS_CODE` 后构建（模板在 `.env.example`），前端依旧依赖高德服务和域名授权。地图加载失败时显示提示，仍可浏览地点照片；增加路线请求超时、取消过期播放、键盘地点选择和父页面明暗同步。新增 map 永久链接保留路径。构建 79 页，Astro Check 357 文件 0 错误/警告/提示，地图数据/照片完整性及筛选、重复到访、路线采样测试 2 项通过；生成页面核对菜单、iframe、28 地点数据和全部照片，样式、字体、Pagefind 检查通过。受已记录的本地 Chrome 启动限制，真实地图瓦片、远程高德鉴权与浏览器交互未实测。未提交或推送。
- 已完成（2026-10-04）：页脚原有的 Astro/Mizuki/Version 9.0 文案已替换为备案号 `浙ICP备2026013521号-1`，链接至工信部备案查询站点；构建与 Astro Check 均通过，未提交或推送。
- 已完成（2026-10-04）：评论系统已切换为 Giscus，启用全局评论并配置仓库 `Mxiaocao/Mxiaocao-Blog`、Announcements 分类、pathname 映射和简体中文；配置位于 `src/config/commentConfig.ts`。Astro Check 357 文件无错误，构建 79 页成功，未提交或推送。

- 已完成（2026-10-04）：从旧站快照 `a4edb3d112c0eec10b40778cd9785c87d4992a87` 迁移六个物理实验至 `public/physics-lab/`，保留原 URL 与实验实现，仅清理弦振动文件外围 Markdown 标题/代码围栏。按用户后续要求合并成一个“交互式物理实验室”项目（`/projects/physics-lab/`），标注“学习实践”；项目页共 4 张卡片，物理分类 1 项，首页仍为原三个精选软件项目。合集详情提供六个实验的直接入口与折叠操作说明；按用户要求不展示物理实验源码链接，不加载实验 iframe，也不重复展示单项状态/技术栈/日期。六个旧单项详情地址跳转至合集相应锚点，旧物理索引直接跳转合集。数据在 `src/data/physics-projects.ts`，来源、原始 SHA-256 与映射在 `migration/physics-lab.json`；算法演示不在迁移范围内。沿用已验证的 Astro public 静态资源及静态跳转方式。
  验证：合并后构建 77 页（含六个兼容跳转），Astro Check 355 文件 0 错误/警告/提示，迁移测试 2 项通过；生成 HTML 核对 4 个项目、1 个物理合集、6 个直接实验入口与旧详情锚点跳转，样式、字体与 Pagefind（44 页）检查通过。浏览器交互未实测（迁移时本地 Chrome 启动崩溃）；两项三维实验仍依赖 Three.js CDN 与 WebGL。已有 content-models 测试的 lab 保留路径断言失败未在本次处理。未提交或推送。

- 已完成（2026-10-04）：将“链表”和“栈”从 `ACM-ICPC / 数据结构 / 算法竞赛` 改归 `技术学习 / 计算机基础 / 数据结构`，对应截图中的外层数据结构入口；只修改两篇文章的 category、subcategory、topic，保留原文件路径和正文以维持文章 URL。分类测试 5 项通过；使用本地 Astro CLI 构建 69 页，核对生成列表中两篇分类与原文章路由，样式、字体和 Pagefind 检查通过。未提交或推送。

- 已完成（2026-10-04）：关闭文章代码块及行内代码的字体连字，修复 JetBrains Mono 将 `!=`、`>=`、`<=`、`==` 视觉合成为数学符号的问题。源码原本为正确的 C++ 运算符，本次只修改 `src/styles/markdown.css`，在 code 及高亮 token 上禁用 liga/calt，覆盖 Expressive Code 的样式重置。生产构建 69 页，样式、字体和 Pagefind 检查通过；Chrome 验证凸包代码 DOM 保留原始运算符，代码与 token 的计算样式均禁用连字，截图 `.tmp/code-operators-fixed.png`。未提交或推送。

- 已完成（2026-10-04）：重写计算几何“9.2 凸包”的 Andrew 单调链交互模拟，沿用已核对的 Astro public 静态资源方案；入口 `public/algo-vis/convex-hull.html`，独立算法快照 `convex-hull-engine.mjs`、界面 `convex-hull.mjs`、局部样式 `convex-hull.css`，复用图论模拟器的基础样式。逐步展示排序去重、下凸壳、上凸壳、lower_size、叉积与出入栈，支持播放/暂停、回退、调速、进度拖动、随机/预置点集、坐标输入和点击增删点；最多 30 点、坐标为 -10～10 的整数，共线边只保留端点，处理空集/单点/两点/重复点。完成后展示面积、周长，退化线段明确标为往返长度。原文章路径保留，更新 iframe 并增加独立入口，同时修正 C++ 的未定义 other 引用与叉积乘号笔误。6 项 Node 测试通过，包含 100 组随机点集与 Jarvis march 独立对照；文章 C++ 模板经 g++ C++17 编译运行验证。生产构建 69 页、Astro Check 353 文件无错误/警告/提示，样式、字体、Pagefind 检查通过。Chrome 实测播放/暂停/回退、预置退化情况、鼠标点击增删点、非法输入、340px 布局、文章嵌入、暗色与 390px 编辑区自动高度通过，截图在 `.tmp/hull-*.png`。本次未修改图论实现，未提交或推送。

- 已完成（2026-10-04）：重写图论文章原有 5 处算法模拟器，覆盖 Dijkstra、SPFA（可切换 Bellman-Ford）、Floyd、Kruskal、Prim。源码为 `public/algo-vis/` 下 5 个 HTML 入口，共享 `algorithms.mjs` 纯算法快照、`simulator.mjs` 界面与 `simulator.css` 样式；依 Astro 官方 public 目录说明（https://docs.astro.build/en/basics/project-structure/#public）随静态构建原样发布，无外部运行时依赖。4 篇文章保留原路径和正文，仅更新 iframe 标题、高度、边框并增加独立模拟器链接；Tarjan 与拓扑排序原文没有 iframe，本次未改。提供播放/暂停、前后单步、重置、进度拖动、速度、源点、预置图和自定义边输入（2～8 顶点、最多 32 边、整数权重 -99～99，不支持自环/重复边）；图、距离/前驱、队列、矩阵、生成树权重与伪代码同步。Dijkstra 拒绝负权，SPFA/Bellman-Ford 检测源点可达负环，Floyd 检测任意负环，MST 区分不连通图。iframe 自动高度与同源明暗主题同步，减少动效设置生效。`node --test tests/graph-simulators.test.mjs` 7 项通过（含 30 组确定性随机图、MST 穷举对照）；Astro Check 353 文件无错误/警告/提示，生产构建 69 页及样式、字体、Pagefind 检查通过。Chrome 实测 5 个入口、播放/暂停/回退、异常输入、完成状态、340px 窄屏、文章双 iframe、390px 手机、主题同步和编辑区自动高度；截图在 `.tmp/graph-*.png`。保留所有已有改动，未提交或推送。

- 已完成（2026-10-04）：时间线按用户提供的教育经历录入两条，大学在读为 2025-09 至今，高中为 2022-09 至 2025-06（已毕业），倒序展示并保留原节点、卡片和当前状态样式。筛选只显示有记录的教育类别；未填写学校、地点、专业、成绩或其他经历。时长改为按自然月差计算，日期栏与标题区支持换行。构建 69 页，Astro Check 353 文件无错误/警告/提示，生成 HTML 已核对日期、当前状态、筛选与高中 2 年 9 个月时长；样式、字体、Pagefind 检查通过。

- 已完成（2026-10-03）：按用户提供的旧友链页面迁移内容，恢复友链数据 14 条，分为算法竞赛/在线评测/刷题网站与编程资源两组标签；录入洛谷、Codeforces、HDOJ、LeetCode、AtCoder、PTA、牛客、VJudge、GitHub、Stack Overflow、OI Wiki、菜鸟教程、MDN Web Docs、ChatGPT。数据入口为 `src/data/friends.ts`，ChatGPT、AtCoder 和 MDN 使用本地图标，FriendCard 提供加载失败时的文字回退，沿用现有搜索、标签筛选和卡片模板。Astro Check 353 文件 0 错误/警告/提示，生产构建生成 69 页；构建日志仅保留既有文章数学字符警告。

- 已完成（2026-10-03）：技能页录入用户指定 11 项及等级：前端 HTML 初级；编程语言 C++/C 中级、Java/Python/Rust 初级；开发工具 VS Code 高级、Git/GitHub 中级；系统与容器 Docker/Linux 初级。新增 languages/systems 分类和四种界面语言翻译，保留原卡片、等级条与筛选；年限改为可选，不虚构经验时长。图标改为 Astro 构建时嵌入 SVG，避免依赖客户端图标服务。Chrome 验证分类数量 11/1/5/3/2 与移动端无横向溢出，11 个等级均核对；构建 69 页，类型、样式、字体及 Pagefind 检查通过。

- 已完成（2026-10-03）：按用户清单补齐 AI 工具页四类五条记录：聊天 ChatGPT、编程 Codex/WorkBuddy、生图 ChatGPT Image、三维建模 Tripo3D；保留卡片与分类筛选，补充用途、描述、标签和官方链接。新增 modeling 分类及四种界面语言翻译；使用频率改为可选，未提供时不显示频率徽章与进度条。Chrome 验证筛选数量 5/1/2/1/1、390px 无横向溢出；Astro Check 353 文件无错误/警告/提示，构建 69 页，样式、字体及 Pagefind 检查通过。WorkBuddy 官网与 Tripo3D 用途分别核对 https://cloud.tencent.com/act/pro/workbuddy 和 https://www.tripo3d.ai/tutorials 。

- 已完成（2026-10-03）：悬浮音乐面板、侧栏播放器和独立展开播放器增加“去网易云听完整版”及“查看歌单”入口；歌曲链接随当前歌曲更新，点击暂停站内播放并在新窗口打开网易云。Meting 响应无 id 时从音频接口 URL 提取歌曲 ID，无法确定歌曲时仅提供歌单链接；本地及其他平台模式不显示网易云入口。保留现有站内播放，不改变会员试听限制。链接解析边界校验通过，Astro Check 351 文件无错误/警告/提示，构建 68 页及样式、字体、Pagefind 检查通过。

- 已完成（2026-10-03）：播放器切换为 `meting` 在线模式，使用用户提供的网易云歌单 `18397057176`，配置位于 `src/config/musicConfig.ts`；继续使用现有 Meting 接口。只读请求返回 HTTP 200、51 首歌曲，响应支持跨域，title/author/url/pic 字段与播放器兼容；生产构建、样式、字体和 Pagefind 检查通过。未逐首验证音频播放，歌曲可用性取决于音乐源；本地音乐资源保留。

- 已完成（2026-10-03）：按用户要求将追番替换为读书，新增书籍卡片与状态筛选，开关为 `featurePages.books`，导航预设为 `LinkPreset.Books`；沿用 Mizuki 布局与筛选组件，旧番剧数据/API 工具不用于书籍。依据 Astro 官方路由文档保留旧地址静态跳转，并将 books 加入文章永久链接保留路径。Astro Check 为 350 个文件、0 错误/警告/提示；最终构建 68 页，样式、字体和 Pagefind 检查通过，生成 HTML 验证书单空状态、三个状态筛选、导航与旧地址跳转通过。

- 已完成（2026-10-03）：仅初始化“更多”下的友链、追番、随笔、相册、技能展示、时间线、我使用的 AI 工具七页；归档与文章内容不在本次范围内。六个 TypeScript 数据列表置空，七页均有空状态，页面入口和录入机制保留。Astro Check 检查 347 个文件，0 错误/警告/提示；生产构建生成 67 页；样式、字体、Pagefind 和七页生成 HTML 空状态校验通过，示例相册详情不再生成。本次 pnpm 启动因软件源不可访问失败，改用已安装的 Astro CLI（禁用遥测）与本地检查脚本完成验证。

- 已完成（2026-10-02）：按文章目录中的 ACM-ICPC 菜单重分类迁移文章，统一使用 `基础算法`、`STL`、`数据结构`、`图论`、`动态规划`、`数学`、`字符串`、`题解`、`比赛复盘` 九个二级分类；保留原文件路径以避免文章 URL 改变。
- 已完成（2026-10-03）：已新增 `ACM-ICPC/计算几何`，并将二维几何、凸包两篇文章归入该分类；菜单继续由统一分类树结合文章 Frontmatter 生成。
- 已完成（2026-10-03）：将旧地址为 `2026/05/24/女王生日快乐` 的生日文章作为 2026-05-24 随笔条目录入日记数据，接入用户提供的图片，不设置标签。
- 已完成（2026-10-03）：随笔列表和详情页同时显示绝对发布日期与相对时间，避免只显示“多少天前”。
- 已完成（2026-10-03）：修复 Wallpaper Engine `3712980239.mpkg` 视频提取偏移；旧 MP4 混入 110 字节包文本且尾部截断，已从原包偏移 349008 正确提取 60,739,598 字节完整视频。当前横幅、全屏横幅和透明背景模式均接入动态视频，预览图仅用于加载占位。
- 已完成（2026-10-03）：将默认壁纸模式设为 `fullscreen`，打开网站即可使用该全屏壁纸。

- 已完成（2026-10-02）：移除迁移文章 Frontmatter 中统一的 `/img/2.jpg` 封面字段，文章页不再显示重复的大图；正文内实际使用的图片引用保留。

- 已修复（2026-10-02）：部分 Legacy 正文包含导出的 MathJax SVG/HTML，导致文章页正文渲染为空；迁移时移除失效的嵌入 SVG 容器，保留 Markdown 正文、标题、题解、代码和图片引用。AtCoder 文章构建后正文可见，Pagefind 索引词数恢复。

- 已完成（2026-10-02）：从 Legacy `recovery/markdown-mizuki` 分支迁移 40 篇 ACM/ICPC 相关 Markdown 文章到 `src/content/posts/algorithms/`，按 STL、图论、动态规划、数学、几何、字符串、数据结构及各竞赛平台分组；补齐 `public/img/` 中文章引用的本地图片并统一反斜杠图片路径。`pnpm run check` 通过，`pnpm build` 通过（42 页被 Pagefind 索引）。

- 当前任务：文章迁移已开始。文章目录按 `algorithms`、`engineering`、`devlog` 分组；`algorithms` 下已建立 `stl`、`data-structures`、`dp`、`graph`、`math`、`geometry`、`string`、`contests` 专题目录。首篇样板文章已迁移至 `src/content/posts/algorithms/stl/2-1-8-deque.md`，保留原文核心内容，并使用 `category: STL` 和旧日期 `permalink`。由于当前实现对自定义 permalink 文章仍保留按文件路径生成的兼容文章路径，本篇生成 `/posts/algorithms/stl/2-1-8-deque/` 与旧 `/2026/05/14/2-1-8-deque/`。Writing 与 Archive 页面显式传入分类筛选模式：Writing 分类按钮保持 `/writing/?category=...` 并保留文章页头，Archive 分类按钮保持 `/archive/?category=...`。筛选项和统计均来自文章 frontmatter 的 `category`，新增数学、图论等分类文章后会自动出现，无需修改页面代码。About 页面已按旧站信息结构重新整理为简体中文，时间轴内容按用户要求不迁移。独立 Lab 页面仍不作为公开栏目，后续实验内容并入项目详情。
- 工作仓库：`E:\03-Projects\Mxiaocao-Blog`，分支 `main`，跟踪 `origin/main`；本阶段起点为 `0ddae87`；域名更新提交在其后。两项已有 `.vscode` 删除保持未暂存，不纳入任务提交。
- 已完成：首页独立并展示三个精选项目，Writing 承担文章分页，旧数字分页兼容跳转；项目统一 schema 与详情页；Notes 的独立模型、空状态、草稿过滤及正文页；导航整理并保留原功能入口。
- 已完成：临时内容实测 Writing 第二页、旧分页跳转和 Notes/Lab 正文，测试内容已删除并重新构建；六条新页面跳转保持 Swup 单页切换，390–1440 像素视口无水平溢出，明暗主题及长菜单已检查。
- 已完成：About 页面改为 MDX 内容，移除当前项目列表和 GitHub 项目卡片，加入算法与数据结构学习方向、用户提供的中文生活文字，并通过独立 Astro 组件恢复旧站风格的左右布局彩色饼图；页面标题为“关于我”，未迁移旧站时间轴经历。
- 已完成：站点内容初始化，删除 `src/content/posts/` 下全部模板/演示文章，写作页保留“暂无已发布文章”空状态；关闭文章标签侧栏和分类导航条，运行天数从 2026-10-01 重新计算。
- 用户决定继续有效：先整理框架，旧内容后续慢慢导入，不追查 Hexo 源码，不把内容来源作为框架工作前置条件。
- 历史迁移数据：`migration/legacy-url-inventory.json` 来自旧站静态分支 `a4edb3d112c0eec10b40778cd9785c87d4992a87`，保留 142 个 HTML 路径；本阶段未改写历史迁移清单或批量导入旧文。

## 下一阶段建议

1. 内容逐步导入：继续使用现有 posts、notes、lab 与项目数据入口少量录入；按历史 URL 清单确定需要保留或重定向的链接，再扩展迁移。首篇 `2.1.8 deque` 已完成构建验证，下一篇需沿用同样的逐篇核对流程。
2. 内容翻译与上线验收：逐篇翻译 About、Writing、Notes 内容，并确认部署平台、链接、搜索、订阅、元数据、响应式及可访问性。
确认后再发布。

# 已知问题与技术债

- 已复现（2026-10-01，Windows / Node 24.21.0 / Astro 7.1.3）：开发服务器在 Vite 初始化期间停滞。AI 环境自动后台启动在 30 秒后超时；设置 `ASTRO_DEV_BACKGROUND=1` 前台诊断后仍未就绪，日志末尾停留在 `virtual:astro:pages` 解析附近，根因尚未确定。未修改依赖源码；本次诊断进程已停止。`pnpm build` 与 `pnpm preview` 正常，可用构建加预览验证页面，热更新开发尚不可用。
- 字体检查限制：`MIZUKI_FONT_MODE=system` 使 `.astro/fonts.d.ts` 生成空的 CssVariable 联合，导致 Layout 的三个 Font 参数报 `string` 不能赋给 `never`。默认 `custom` 模式重新生成类型后，`pnpm run check` 为 0 错误、0 警告；不应把系统字体模式的结果误判为默认模式失败。
- 内容同步现已默认关闭；只有显式设置 `ENABLE_CONTENT_SYNC=true` 才开启。启用后的上游逻辑仍可能暂存或重置内容、替换目录、执行 `git add .` 并提交，因此未采用外部内容工作流前不得开启。用户未授权启用内容同步。
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
- 已验证（2026-10-01）：站点初始化后的 `pnpm run check` 通过（343 个文件，0 错误、0 警告、0 提示），`pnpm run build` 成功生成 `/writing/` 空状态、无文章 RSS/Atom 和 22 个页面；Pagefind 索引 4 个页面、301 个词，字体与样式检查通过。
- 已验证（2026-10-01）：站点初始化后的 `pnpm test` 共 48 项，46 项通过；路由边界异常断言和独立 Wiki Link Markdown 测试失败，均与本次内容清理无关，需后续单独处理。
- 已验证：`pnpm run check` 检查 344 个文件，0 错误、0 警告、0 提示；本阶段 `pnpm run type-check` 通过。`pnpm run type-check` 通过。
- 已验证：`pnpm test` 的 48 项 Node 测试和 8 项加密测试通过，包含内容模型与路由边界回归测试。
- 已验证：临时内容构建确认 `/writing/2/`、旧 `/2/` 跳转及 Notes 正文可用；草稿模板无公开页面。最终预览检查新路由及六次 Swup 页面切换；手机/桌面、明暗模式、More 菜单滚动通过。历史清单保持不变。
- 已知限制：`pnpm dev` 初始化停滞；系统字体模式的 Astro Font 类型检查限制详见上文。不得把生产预览通过描述成开发热更新已修复。
- 壁纸集成：原始 3840×2160 视频位于 `public/assets/wallpaper/3712980239.mp4`；按 Astro 官方 public 资源说明（https://docs.astro.build/en/basics/project-structure/#public）原样提供，不转码。`fullscreen` 实际使用 `Banner.astro`，`FullscreenWallpaper.astro` 用于 `overlay`，两者复用 `WallpaperVideo.astro`；不能只改后者而声称全屏已播放视频。
- 壁纸显示：`siteConfig.banner.video` 配置源、占位图和原始宽高；横幅模式使用 `object-fit: cover` 和 `object-position: center 48%` 铺满两侧、裁掉上下墙面并保留中央桃花；全屏及透明背景模式使用 `object-fit: contain` 保留完整构图，全屏横幅高度按视频比例随视口宽度缩小，并限制在一屏内，避免窄窗口裁剪放大或大块上下留黑。组件在画面隐藏、离开视口或切换标签页时暂停，重新可见时恢复静音循环播放。
- 已验证（2026-10-03）：横幅裁剪调整后，Chrome 在截图对应文章页的 1996/1440 宽度下确认视频铺满视口宽度、无两侧黑边且正常播放；切换全屏恢复 contain。生产构建 69 页，样式、字体与 Pagefind 检查通过。
- 壁纸缓存迁移：既有 `wallpaperConfigVersion=3712980239-video-v1` 一次性清理旧模式与视觉参数；本次无需用户粘贴 Console 命令。
- 已验证（2026-10-03）：Chrome 实测原始视频可解码（3840×2160），播放时间持续递增；1996/1035/390 像素宽度无横向溢出，全屏/透明背景切换及 About 隐藏/恢复视频正常。Astro Check 353 文件无错误/警告/提示；生产构建 69 页，样式、字体与 Pagefind 检查通过。预览截图保留在本地 `.tmp/wallpaper-desktop.png` 与 `.tmp/wallpaper-narrow.png`。

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








