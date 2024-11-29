// types/article.ts
import { z } from "zod";

// types/article.ts
export const ArticleSchema = z.object({
	headline: z.string(),
	dateline: z.string(),
	author: z.object({
		name: z.string(),
		title: z.string(),
	}),
	featuredImage: z
		.object({
			url: z.string(),
			caption: z.string(),
		})
		.default(() => ({
			url: "public/breaking.png",
			caption: "Breaking News",
		})),
	article_body: z.array(
		z.object({
			topic_sentence: z.string(),
			content: z.string(),
		})
	),
	disclaimer: z.string(),
});
export type Article = z.infer<typeof ArticleSchema>;

export type ArticleParagraph = {
	topic_sentence: string;
	content: string;
};

export type GenerateArticleResponse = {
	article: string;
	error?: string;
};
