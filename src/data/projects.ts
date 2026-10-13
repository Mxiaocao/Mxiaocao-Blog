// Verified project records for the Projects page and homepage.
import type { ProjectInput } from "../schemas/content";
import { physicsProjects } from "./physics-projects";
export type { Project } from "../schemas/content";

export const projectsData: ProjectInput[] = [
	{
		id: "acm-os",
		development: { label: "AI 生成", description: "本项目的代码由 AI 生成。" },
		title: "ACM-OS",
		description: "面向算法竞赛学习的本地桌面工作区，v0.1.0 已发布 Windows 版，支持比赛整理、题库管理与学习月历。",
		category: "desktop",
		techStack: ["TypeScript", "React", "Rust", "Tauri", "SQLite"],
		status: "released",
		release: { version: "v0.1.0", url: "https://github.com/Mxiaocao/acm-os/releases/tag/v0.1.0" },
		sourceCode: "https://github.com/Mxiaocao/acm-os",
		startDate: "2026-09-23",
		sections: [
			{ title: "v0.1.0 发布", body: "首个 Windows 产品版本，提供 x64 安装包、免安装 ZIP 和 SHA-256 校验文件。首次运行时按提示设置工作区，数据保存在本地。" },
			{ title: "当前功能", body: "比赛书架随窗口宽度调整每层容量，各分类共用年份。支持 Codeforces 单题链接导入和手动录入题目，题库提供关键词搜索与 LaTeX 题面预览。独立学习月历用于查看学习记录和下一次复习安排。" },
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
