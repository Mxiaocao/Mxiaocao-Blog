// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other" | "languages" | "systems";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience?: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	{
		id: "html",
		name: "HTML",
		description: "网页结构与语义化标记。",
		icon: "simple-icons:html5",
		category: "frontend",
		level: "beginner",
		color: "#E34F26",
	},
	{
		id: "cpp",
		name: "C++",
		description: "通用编程语言，用于算法、数据结构与程序开发。",
		icon: "simple-icons:cplusplus",
		category: "languages",
		level: "intermediate",
		color: "#00599C",
	},
	{
		id: "c",
		name: "C",
		description: "面向过程编程语言，用于基础程序与系统开发。",
		icon: "simple-icons:c",
		category: "languages",
		level: "intermediate",
		color: "#659AD2",
	},
	{
		id: "java",
		name: "Java",
		description: "面向对象编程语言，用于应用程序开发。",
		icon: "fa7-brands:java",
		category: "languages",
		level: "beginner",
		color: "#E76F00",
	},
	{
		id: "python",
		name: "Python",
		description: "用于脚本编写、数据处理与自动化。",
		icon: "simple-icons:python",
		category: "languages",
		level: "beginner",
		color: "#3776AB",
	},
	{
		id: "rust",
		name: "Rust",
		description: "注重内存安全与性能的系统编程语言。",
		icon: "simple-icons:rust",
		category: "languages",
		level: "beginner",
		color: "#B65E3C",
	},
	{
		id: "vscode",
		name: "VS Code",
		description: "代码编辑、调试与扩展管理。",
		icon: "mdi:microsoft-visual-studio-code",
		category: "tools",
		level: "advanced",
		color: "#007ACC",
	},
	{
		id: "git",
		name: "Git",
		description: "代码版本管理、分支协作与变更追踪。",
		icon: "simple-icons:git",
		category: "tools",
		level: "intermediate",
		color: "#F05032",
	},
	{
		id: "github",
		name: "GitHub",
		description: "代码托管、项目协作与开发记录。",
		icon: "simple-icons:github",
		category: "tools",
		level: "intermediate",
		color: "#6E5494",
	},
	{
		id: "docker",
		name: "Docker",
		description: "容器化环境与应用部署。",
		icon: "simple-icons:docker",
		category: "systems",
		level: "beginner",
		color: "#2496ED",
	},
	{
		id: "linux",
		name: "Linux",
		description: "命令行操作、文件管理与开发环境。",
		icon: "simple-icons:linux",
		category: "systems",
		level: "beginner",
		color: "#B8860B",
	},
];
