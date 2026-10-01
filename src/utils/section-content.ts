import { getCollection } from "astro:content";
import { projectsData } from "../data/projects";

export async function getNotes() {
	return (await getCollection("notes", ({ data }) => !data.draft)).sort(
		(a, b) =>
			b.data.published.valueOf() - a.data.published.valueOf() ||
			a.id.localeCompare(b.id),
	);
}
export async function getLabEntries() {
	return (await getCollection("lab", ({ data }) => !data.draft)).sort(
		(a, b) =>
			b.data.published.valueOf() - a.data.published.valueOf() ||
			a.id.localeCompare(b.id),
	);
}
export async function getProjects() {
	const order = new Map(
		projectsData.map((project, index) => [project.id, index]),
	);
	return (await getCollection("projects"))
		.map(({ data }) => data)
		.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}
