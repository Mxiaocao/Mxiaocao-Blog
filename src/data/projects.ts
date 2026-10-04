// Verified project records for the Projects page and homepage.
import type { ProjectInput } from "../schemas/content";
import { physicsProjects } from "./physics-projects";
export type { Project } from "../schemas/content";

export const projectsData: ProjectInput[] = [
	{
		id: "acm-os",
		title: "ACM-OS",
		description: "用于竞赛训练、题目笔记与知识管理的桌面工作区，仓库正在按 M0–B0.3 逐步开发。",
		category: "desktop",
		techStack: ["TypeScript", "React", "Rust", "Tauri", "SQLite"],
		status: "in-progress",
		sourceCode: "https://github.com/Mxiaocao/acm-os",
		startDate: "2026-09-23",
		sections: [{ title: "当前证据", body: "README 记录了 M0–B0.3 的渐进式开发内容：SQLite 启动与迁移门、Active Vault / Problem Notes Root / Knowledge Root 配置，以及 B0.4 Recovery、Setup 或 Normal 启动壳层。仓库还提供锁定的边界检查、构建检查和 Rust 检查。" }],
		featured: true,
		tags: ["Desktop", "Tauri", "Computer Science"],
	},
	{
		id: "dorm-hygiene",
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
	return { total, byStatus: { completed, inProgress, planned } };
};
export const getProjectsByCategory = (category?: string) => !category || category === "all" ? projectsData : projectsData.filter((p) => p.category === category);
export const getFeaturedProjects = () => projectsData.filter((p) => p.featured);
export const getAllTechStack = () => Array.from(new Set(projectsData.flatMap((project) => project.techStack))).sort();
