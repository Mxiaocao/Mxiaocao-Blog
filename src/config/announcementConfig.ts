import type { AnnouncementConfig } from "../types/config";

// 公告栏配置
export const announcementConfig: AnnouncementConfig = {
	title: "", // 公告标题，填空使用i18n字符串Key.announcement
	content: "欢迎来到 Mxiaocao 的个人网站：记录软件项目、计算机科学与工程实践。", // 公告内容
	closable: true, // 允许用户关闭公告
	link: {
		enable: true, // 启用链接
		text: "关于", // 链接文本
		url: "/about/", // 链接 URL
		external: false, // 内部链接
	},
};


