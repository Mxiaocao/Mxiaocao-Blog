export const reservedPostRoots = new Set([
	"writing",
	"projects",
	"physics-lab",
	"map",
	"notes",
	"about",
	"archive",
	"posts",
	"friends",
	"albums",
	"anime",
	"books",
	"diary",
	"devices",
	"skills",
	"timeline",
	"ai-tools",
	"api",
	"rss",
	"atom",
	"404",
]);

export function assertPostPermalinkAvailable(permalink: string, id: string) {
	const decoded = decodeURIComponent(permalink).replace(/^\/+|\/+$/g, "");
	const root = decoded.split("/")[0].toLowerCase();
	if (
		!decoded ||
		reservedPostRoots.has(root) ||
		/^\d+$/.test(decoded) ||
		decoded.split("/").some((segment) => segment === "." || segment === "..") ||
		/[?#\\]/.test(decoded)
	) {
		throw new Error(
			`Post "${id}" uses reserved or invalid permalink "${permalink}". Choose a path outside the site sections.`,
		);
	}
}

export function writingPagePath(page: number): string {
	if (!Number.isInteger(page) || page < 1)
		throw new Error("Page must be a positive integer");
	return page === 1 ? "/writing/" : `/writing/${page}/`;
}
