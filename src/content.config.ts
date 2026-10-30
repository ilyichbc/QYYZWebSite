import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const news = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
	schema: z.object({
		title: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
		description: z.string().default(""),
		category: z.string().default("记录"),
		cover: z.string().optional(),
		coverAlt: z.string().default(""),
		tags: z.array(z.string()).default([]),
		author: z.string().default("祁阳一中"),
		/** 微信原文链接 */
		source: z.string().optional(),
		draft: z.boolean().default(false),
		pinned: z.boolean().default(false),
	}),
});

const pages = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().default(""),
		updated: z.coerce.date().optional(),
	}),
});

export const collections = { news, pages };
