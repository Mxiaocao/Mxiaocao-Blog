import { z } from "astro/zod";

const text = z.string().trim().min(1);
const webUrl = z
	.url()
	.refine((value) => /^https?:\/\//.test(value), "Use an HTTP(S) URL");
const demoUrl = z
	.string()
	.refine(
		(value) => /^https?:\/\//.test(value) || /^\/(?!\/)/.test(value),
		"Use an HTTP(S) URL or a site-relative path",
	);
export const projectSchema = z.object({
	id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	title: text,
	description: text,
	image: z.string().optional(),
	category: z.enum(["web", "mobile", "desktop", "physics", "other"]),
	techStack: z.array(text),
	status: z.enum(["completed", "in-progress", "planned"]),
	liveDemo: demoUrl.optional(),
	embedDemo: z.boolean().default(false),
	sourceCode: webUrl.optional(),
	visitUrl: webUrl.optional(),
	startDate: z.iso.date().optional(),
	endDate: z.iso.date().optional(),
	featured: z.boolean().optional(),
	tags: z.array(text).optional(),
	showImage: z.boolean().optional(),
	isDemo: z.boolean().default(false),
	sections: z.array(z.object({ title: text, body: text })).default([]),
	experiments: z.array(z.object({
		id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
		title: text,
		description: text,
		instructions: text,
		liveDemo: demoUrl,
	})).default([]),
});
export type Project = z.infer<typeof projectSchema>;
export type ProjectInput = z.input<typeof projectSchema>;

const entryFields = {
	title: text,
	description: text,
	published: z.coerce.date(),
	updated: z.coerce.date().optional(),
	draft: z.boolean().default(false),
	tags: z.array(text).default([]),
};
export const noteSchema = z.object({
	...entryFields,
	kind: z.enum(["til", "debugging", "reference"]),
});
export const labSchema = z.object({
	...entryFields,
	kind: z.enum(["visualization", "tool", "experiment"]),
	status: z.enum(["in-progress", "completed", "archived"]),
	demoUrl: demoUrl.optional(),
	sourceCode: webUrl.optional(),
});
