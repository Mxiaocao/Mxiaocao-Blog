export type AIToolCategory =
	| "chat"
	| "coding"
	| "image"
	| "modeling"
	| "audio"
	| "video"
	| "writing"
	| "search"
	| "other";

export type AIToolFrequency =
	| "daily"
	| "weekly"
	| "occasional"
	| "experimental";

export type LocaleString = Partial<
	Record<"en" | "zh_CN" | "zh_TW" | "ja", string>
>;

export function getLocaleString(value: LocaleString, lang: string): string {
	return value[lang as keyof LocaleString] ?? value["en"] ?? "";
}

export interface AITool {
	id: string;
	name: string;
	description: LocaleString;
	icon: string;
	category: AIToolCategory;
	frequency?: AIToolFrequency;
	url?: string;
	usage?: LocaleString;
	tags?: string[];
	color?: string;
}

// ChatGPT appears twice because chat and image generation are separate uses.
export const aiToolsData: AITool[] = [
	{
		id: "chatgpt-chat",
		name: "ChatGPT",
		category: "chat",
		icon: "material-symbols:forum-outline",
		color: "#10a37f",
		url: "https://chatgpt.com/",
		usage: { zh_CN: "聊天、问答与思路整理", en: "Chat, questions and brainstorming" },
		description: { zh_CN: "通过对话讨论问题、解释概念，整理想法与文字。", en: "Discuss questions, explore concepts, and organize ideas through conversation." },
		tags: ["聊天", "问答", "思路整理"],
	},
	{
		id: "codex",
		name: "Codex",
		category: "coding",
		icon: "material-symbols:terminal",
		color: "#5b6ee1",
		url: "https://openai.com/codex/",
		usage: { zh_CN: "代码编写、调试与项目开发", en: "Coding, debugging and development" },
		description: { zh_CN: "协助阅读和修改项目代码，排查问题、实现功能并运行检查。", en: "Read and edit project code, investigate issues, implement features, and run checks." },
		tags: ["编程", "调试", "代码审查"],
	},
	{
		id: "workbuddy",
		name: "WorkBuddy",
		category: "coding",
		icon: "material-symbols:code",
		color: "#3378f6",
		url: "https://www.workbuddy.cn/",
		usage: { zh_CN: "开发协作与任务执行", en: "Development assistance and task execution" },
		description: { zh_CN: "通过自然语言描述需求，辅助开发任务与工作流程自动化。", en: "Describe tasks in natural language for development assistance and workflow automation." },
		tags: ["编程", "AI 智能体", "自动化"],
	},
	{
		id: "chatgpt-image",
		name: "ChatGPT Image",
		category: "image",
		icon: "material-symbols:image-outline",
		color: "#d779a8",
		url: "https://chatgpt.com/",
		usage: { zh_CN: "图片生成与修改", en: "Image generation and editing" },
		description: { zh_CN: "根据文字或参考图片生成图像，通过对话调整画面和细节。", en: "Create images from prompts or references and refine their details through conversation." },
		tags: ["生图", "图片编辑", "视觉创作"],
	},
	{
		id: "tripo3d",
		name: "Tripo3D",
		category: "modeling",
		icon: "material-symbols:deployed-code-outline",
		color: "#8b5cf6",
		url: "https://www.tripo3d.ai/",
		usage: { zh_CN: "AI 三维建模", en: "AI 3D modeling" },
		description: { zh_CN: "根据文字描述或参考图片生成三维模型，用于建模与创意探索。", en: "Generate 3D models from text or reference images for modeling and creative exploration." },
		tags: ["建模", "3D", "模型生成"],
	},
];
