import type { TimelineItem } from "../components/features/timeline/types";

export const timelineData: TimelineItem[] = [
	{
		id: "university",
		title: "大学在读",
		description: "2025 年 9 月进入大学，目前在读。",
		type: "education",
		startDate: "2025-09",
	},
	{
		id: "high-school",
		title: "高中毕业",
		description: "2022 年 9 月开始高中学习，2025 年 6 月毕业。",
		type: "education",
		startDate: "2022-09",
		endDate: "2025-06",
	},
];
