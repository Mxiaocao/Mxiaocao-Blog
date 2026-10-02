export interface ArticleClassification {
	category?: string | null;
	subcategory?: string | null;
	topic?: string | null;
}

export interface ArticleBranch {
	name: string;
	children?: ArticleBranch[];
}

// Classification has at most three levels. Specific concepts belong in tags.
export const articleTaxonomy: ArticleBranch[] = [
	{ name: "技术学习", children: [
		{ name: "编程语言", children: ["C / C++", "Java", "Python", "其他"].map(name => ({ name })) },
		{ name: "计算机基础", children: ["数据结构", "计算机系统原理"].map(name => ({ name })) },
		{ name: "Web 开发" },
		{ name: "开发环境与工具", children: ["Git / GitHub", "Linux", "Docker", "环境配置"].map(name => ({ name })) },
	] },
	{ name: "ACM-ICPC", children: ["基础算法", "STL", "数据结构", "图论", "动态规划", "数学", "计算几何", "字符串", "题解", "比赛复盘"].map(name => ({ name })) },
	{ name: "AI", children: ["AI Coding", "AI 实践"].map(name => ({ name })) },
];

export const articleDescriptions: Record<string, string> = {
	技术学习: "编程语言、计算机基础、Web 开发与开发工具的学习记录。",
	"ACM-ICPC": "算法、题解与比赛复盘。",
	STL: "C++ 标准模板库的常用容器、算法与竞赛应用。",
	AI: "AI Coding 与 AI 实践记录。",
	编程语言: "C / C++、Java、Python 等编程语言的学习记录。",
	计算机基础: "数据结构与计算机系统原理的学习记录。",
	计算机系统原理: "计算机系统原理的课程学习与知识整理。",
	"Web 开发": "Web 开发的课程学习与技术整理。",
	开发环境与工具: "Git / GitHub、Linux、Docker 与开发环境配置记录。",
};

export function articlePageHeading(path: string[]) {
	const title = path.at(-1) || "文章";
	return {
		title,
		subtitle: articleDescriptions[title] || (path.length ? `${title}相关的学习记录与技术文章。` : "算法、软件与工程实践文章。"),
	};
}

export function classificationPath(data: ArticleClassification): string[] {
	// Keep imported legacy STL posts compatible without changing their URLs.
	if (data.category === "STL" && !data.subcategory && !data.topic) return ["技术学习", "编程语言", "C / C++"];
	const path: string[] = [];
	for (const value of [data.category, data.subcategory, data.topic]) {
		if (!value?.trim()) break;
		path.push(value.trim());
	}
	return path;
}

export function articleQuery(path: string[]): string {
	const params = new URLSearchParams();
	["category", "subcategory", "topic"].forEach((key, i) => { if (path[i]) params.set(key, path[i]); });
	return `/writing/${params.size ? `?${params}` : ""}`;
}

export function matchesClassification(path: string[], selected: string[]): boolean {
	return selected.every((name, i) => path[i] === name);
}

export interface ArticleMenuNode {
	name: string;
	path: string[];
	count: number;
	children: ArticleMenuNode[];
}

export function articleFilterGroups(nodes: ArticleMenuNode[], total: number) {
	const groups = [{ path: [] as string[], nodes, count: total }];
	function visit(branches: ArticleMenuNode[]) {
		for (const node of branches) {
			if (!node.children.length) continue;
			groups.push({ path: node.path, nodes: node.children, count: node.count });
			visit(node.children);
		}
	}
	visit(nodes);
	return groups;
}

export function buildArticleMenu(posts: ArticleClassification[]): ArticleMenuNode[] {
	const paths = posts.map(classificationPath);
	function build(branches: ArticleBranch[], parent: string[] = []): ArticleMenuNode[] {
		return branches.map(branch => {
			const path = [...parent, branch.name];
			const count = paths.filter(post => matchesClassification(post, path)).length;
			// Show the complete configured directory, including categories awaiting posts.
			return { name: branch.name, path, count, children: path.length < 3 ? build(branch.children ?? [], path) : [] };
		});
	}
	return build(articleTaxonomy);
}
