export const bookStatusLabels = {
	reading: "在读",
	completed: "已读",
	planned: "想读",
} as const;

export interface Book {
	id: string;
	title: string;
	author: string;
	status: keyof typeof bookStatusLabels;
	cover?: string;
	description?: string;
	publisher?: string;
	publishedYear?: string;
	rating?: number; // 个人评分，0–10 分
	pagesRead?: number;
	totalPages?: number;
	startDate?: string; // YYYY-MM-DD
	endDate?: string; // YYYY-MM-DD
	link?: string;
	tags?: string[];
}

// 在此添加书籍；封面可放在 public/images/books/，填写 /images/books/文件名。
export const booksData: Book[] = [];
