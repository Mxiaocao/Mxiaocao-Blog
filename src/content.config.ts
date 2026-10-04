import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { projectsData } from "./data/projects";
import { projectSchema, noteSchema, labSchema } from "./schemas/content";

import { postGlob } from "./loaders/post-loader";

const postsCollection = defineCollection({
	loader: postGlob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		subcategory: z.string().optional().nullable().default(""),
		topic: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		comment: z.boolean().optional().default(true),
		priority: z.number().optional(),
		author: z.string().optional().default(""),
		sourceLink: z.string().optional().default(""),
		licenseName: z.string().optional().default(""),
		licenseUrl: z.string().optional().default(""),

		/* Page encryption fields */
		encrypted: z.boolean().optional().default(false),
		password: z.string().optional().default(""),
		passwordHint: z.string().optional().default(""),
		hideHomeContent: z.boolean().optional(),

		/* Posts alias */
		alias: z.string().optional(),

		/* Custom permalink - 自定义固定链接，优先级高于 alias */
		permalink: z.string().optional(),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
		_publishedDateOnly: z.boolean(),
		_updatedDateOnly: z.boolean(),
	}).superRefine((data, ctx) => {
		if (data.subcategory?.trim() && !data.category?.trim()) {
			ctx.addIssue({ code: "custom", path: ["subcategory"], message: "二级分类需要填写 category" });
		}
		if (data.topic?.trim() && !data.subcategory?.trim()) {
			ctx.addIssue({ code: "custom", path: ["topic"], message: "三级分类需要填写 subcategory" });
		}
	}),
});
const specCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
	schema: z.object({}),
});
const projectsCollection = defineCollection({
	loader: async () => {
		const ids = new Set(projectsData.map((project) => project.id));
		if (ids.size !== projectsData.length)
			throw new Error("Project IDs must be unique");
		return projectsData;
	},
	schema: projectSchema,
});
const notesCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
	schema: noteSchema,
});
const labCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/lab" }),
	schema: labSchema,
});
export const collections = {
	projects: projectsCollection,
	notes: notesCollection,
	lab: labCollection,
	posts: postsCollection,
	spec: specCollection,
};
