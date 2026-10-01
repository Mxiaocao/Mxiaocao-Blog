# Mxiaocao Blog

Mxiaocao 的个人工程网站，记录软件项目、计算机科学学习和工程实践。

网站地址：[https://mxiaocaoblog.com/](https://mxiaocaoblog.com/)

## 内容

- **项目**：展示 ACM-OS、Dorm Hygiene、Ledgerly 等真实项目，以及经过核实的技术栈、状态和源码链接。
- **文章**：记录算法、软件开发和工程实践。
- **笔记**：记录小发现、调试过程和实用参考。
- **关于**：介绍 Mxiaocao 的技术方向和个人网站信息。
- **特色功能**：保留主题原有的侧栏、公告、音乐、Pio、壁纸、搜索、归档、友链和其他特色页面。

网站界面固定使用简体中文。实验内容暂不作为独立栏目，后续会并入项目详情。

## 技术栈

- Astro
- TypeScript
- Svelte
- Tailwind CSS
- MDX
- Pagefind

## 本地运行

环境要求：Node.js 24+、pnpm 11+。

~~~bash
pnpm install
pnpm run check
pnpm run build
pnpm preview --host 127.0.0.1 --port 3012
~~~

生产构建会生成 `dist/`，并执行页面、样式、搜索索引和字体检查。

开发服务器目前在 Windows 环境下可能停留在 Vite 初始化阶段；开发调试可使用生产构建配合 `pnpm preview`。

## 内容入口

- 文章：`src/content/posts/`
- 关于和友链：`src/content/spec/`
- 笔记：`src/content/notes/`
- 项目数据：`src/data/projects.ts`
- 站点配置：`src/config/`
- 页面路由：`src/pages/`

内容同步默认关闭。只有明确设置 `ENABLE_CONTENT_SYNC=true` 时才会启用外部内容同步。

## 项目状态

当前项目均以仓库 README、构建配置和提交记录为依据。未提供演示地址或未核实的能力描述。

如需联系，请通过已公开的 GitHub 账号访问项目仓库。

## 开发检查

~~~bash
pnpm run check
pnpm run type-check
pnpm run build
pnpm test
~~~

本仓库的 `main` 分支是 Mxiaocao Blog 的独立项目历史；Mizuki 官方仓库仅作为 `upstream` 参考来源，不是本项目的远程仓库。
