// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "洛谷",
		imgurl: "https://cdn.simpleicons.org/luogu",
		desc: "面向算法竞赛的刷题平台",
		siteurl: "https://www.luogu.com.cn/",
		tags: ["网站", "算法竞赛"],
	},
	{
		id: 2,
		title: "Codeforces",
		imgurl: "https://cdn.simpleicons.org/codeforces",
		desc: "全球知名的算法竞赛平台",
		siteurl: "https://codeforces.com/",
		tags: ["网站", "算法竞赛"],
	},
	{
		id: 3,
		title: "HDOJ",
		imgurl: "https://www.google.com/s2/favicons?domain=acm.hdu.edu.cn&sz=128",
		desc: "杭州电子科技大学在线评测平台",
		siteurl: "https://acm.hdu.edu.cn/",
		tags: ["网站", "在线评测"],
	},
	{
		id: 4,
		title: "LeetCode",
		imgurl: "https://cdn.simpleicons.org/leetcode",
		desc: "面试刷题与算法学习平台",
		siteurl: "https://leetcode.cn/",
		tags: ["网站", "刷题"],
	},
	{
		id: 5,
		title: "AtCoder",
		imgurl: "/img/friends/atcoder.png",
		desc: "日本高质量算法竞赛平台",
		siteurl: "https://atcoder.jp/",
		tags: ["网站", "算法竞赛"],
	},
	{
		id: 6,
		title: "PTA",
		imgurl: "https://www.google.com/s2/favicons?domain=pintia.cn&sz=128",
		desc: "拼题 A 编程能力评价平台",
		siteurl: "https://pintia.cn/",
		tags: ["网站", "在线评测"],
	},
	{
		id: 7,
		title: "牛客",
		imgurl: "https://www.google.com/s2/favicons?domain=nowcoder.com&sz=128",
		desc: "面试刷题与竞赛训练平台",
		siteurl: "https://www.nowcoder.com/",
		tags: ["网站", "刷题"],
	},
	{
		id: 8,
		title: "VJudge",
		imgurl: "https://www.google.com/s2/favicons?domain=vjudge.net&sz=128",
		desc: "虚拟在线评测聚合平台",
		siteurl: "https://vjudge.net/",
		tags: ["网站", "在线评测"],
	},
	{
		id: 9,
		title: "GitHub",
		imgurl: "https://cdn.simpleicons.org/github",
		desc: "全球最大的代码托管与协作平台",
		siteurl: "https://github.com/",
		tags: ["编程资源", "代码托管"],
	},
	{
		id: 10,
		title: "Stack Overflow",
		imgurl: "https://cdn.simpleicons.org/stackoverflow",
		desc: "全球知名的编程问答社区",
		siteurl: "https://stackoverflow.com/",
		tags: ["编程资源", "问答"],
	},
	{
		id: 11,
		title: "OI Wiki",
		imgurl: "https://www.google.com/s2/favicons?domain=oi-wiki.org&sz=128",
		desc: "算法竞赛知识整合站点",
		siteurl: "https://oi-wiki.org/",
		tags: ["编程资源", "算法"],
	},
	{
		id: 12,
		title: "菜鸟教程",
		imgurl: "https://www.google.com/s2/favicons?domain=runoob.com&sz=128",
		desc: "入门编程学习站点",
		siteurl: "https://www.runoob.com/",
		tags: ["编程资源", "教程"],
	},
	{
		id: 13,
		title: "MDN Web Docs",
		imgurl: "/img/friends/mdn.svg",
		desc: "Web 开发权威参考文档",
		siteurl: "https://developer.mozilla.org/zh-CN/",
		tags: ["编程资源", "文档"],
	},
	{
		id: 14,
		title: "ChatGPT",
		imgurl: "/img/friends/openai.svg",
		desc: "AI 对话助手与编程问答工具",
		siteurl: "https://chatgpt.com/",
		tags: ["编程资源", "AI 工具"],
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
