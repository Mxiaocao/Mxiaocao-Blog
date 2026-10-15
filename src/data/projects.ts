// Verified project records for the Projects page and homepage.
import type { ProjectInput } from "../schemas/content";
import { physicsProjects } from "./physics-projects";
export type { Project } from "../schemas/content";

export const projectsData: ProjectInput[] = [
	{
		id: "acm-os",
		development: { label: "AI 生成", description: "本项目的代码由 AI 生成。" },
		title: "ACM-OS",
		description: "面向算法竞赛学习的 Windows 桌面工作区，支持比赛整理、题库与复习管理。v0.1.1 改进学习月历和个人题解阅读。",
		category: "desktop",
		techStack: ["TypeScript", "React", "Rust", "Tauri", "SQLite"],
		status: "released",
		release: { version: "v0.1.1", url: "https://github.com/Mxiaocao/acm-os/releases/tag/v0.1.1" },
		sourceCode: "https://github.com/Mxiaocao/acm-os",
		startDate: "2026-09-23",
		sections: [
			{ title: "项目介绍", body: "将比赛、赛后补题、个人题解与复习安排放在同一个本地工作区。支持导入 Codeforces 比赛或单题、手动录题和题库搜索，题面支持 LaTeX。通过 Obsidian 管理 Markdown 笔记，结合今日计划、冷启动与长期复习跟踪学习进度。" },
			{ title: "v0.1.1：学习月历", body: "首次主动将题目加入题库时，月历就会记录入库当天的做题活动。日期格显示做题数量，点击可查看题目并进入个人题解。同题同日的入库、学习和复习活动合并计数，重复导入不会增加做题日期；逾期复习集中显示在今天。" },
			{ title: "个人题解与 Prompt", body: "按 Obsidian Markdown 的章节顺序阅读题解，方法正文可在独立弹窗中查看，支持公式、代码和表格，并可刷新笔记。创建笔记前即可复制 Prompt，也支持笔记中的自定义提示词；提示词需在外部 AI 中使用，结果由用户检查后保存到 Obsidian，应用不会自动调用模型或写回笔记。" },
			{ title: "下载与更新", body: "v0.1.1 面向 Windows x64，提供安装包、免安装 ZIP 与 SHA-256 校验文件，运行需要 Microsoft Edge WebView2 Runtime。更新前退出旧程序，备份工作区数据库和个人 Markdown；新版可继续使用现有工作区，数据库结构版本仍为 36。首次使用时按提示配置工作区与 Obsidian 笔记目录。" },
		],
		featured: true,
		tags: ["Desktop", "Tauri", "Computer Science"],
	},
	{
		id: "dorm-hygiene",
		development: { label: "AI 生成", description: "本项目的代码由 AI 生成。" },
		title: "Dorm Hygiene",
		description: "用于宿舍健康流程的小型服务与 React 前端概念验证，目前处于 P4-B0 脚手架阶段。",
		category: "web",
		techStack: ["TypeScript", "React", "Node.js"],
		status: "in-progress",
		sourceCode: "https://github.com/Mxiaocao/dorm-hygiene",
		startDate: "2026-09-15",
		sections: [{ title: "当前证据", body: "README 描述了包含健康接口和 React 前端的最小 P4-B0 工具链脚手架。仓库脚本覆盖类型检查、单元测试、集成测试和构建；近期提交还加入了生产认证运行时基础。" }],
		featured: true,
		tags: ["PoC", "React", "Service"],
	},
	{
		id: "ledgerly",
		development: { label: "AI 生成", description: "本项目的代码由 AI 生成。" },
		title: "Ledgerly",
		description: "使用 Kotlin Multiplatform 构建的本地优先个人账本，仓库处于 Phase 4 实现与 P4-0 引导阶段。",
		category: "desktop",
		techStack: ["Kotlin", "Kotlin Multiplatform", "Gradle", "Android"],
		status: "in-progress",
		sourceCode: "https://github.com/Mxiaocao/Ledgerly",
		startDate: "2026-09-04",
		sections: [{ title: "当前证据", body: "README 将其标记为 Phase 4 实现与 P4-0 引导阶段。Gradle 设置显示 Kotlin Multiplatform、Android KMP、桌面端、服务端、持久化和同步模块；仓库记录了固定的工具链基线。" }],
		featured: true,
		tags: ["Local-first", "Ledger", "Kotlin"],
	},
	...physicsProjects,
];

export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter((p) => p.status === "in-progress").length;
	const planned = projectsData.filter((p) => p.status === "planned").length;
	const released = projectsData.filter((p) => p.status === "released").length;
	return { total, byStatus: { completed, inProgress, planned, released } };
};
export const getProjectsByCategory = (category?: string) => !category || category === "all" ? projectsData : projectsData.filter((p) => p.category === category);
export const getFeaturedProjects = () => projectsData.filter((p) => p.featured);
export const getAllTechStack = () => Array.from(new Set(projectsData.flatMap((project) => project.techStack))).sort();
