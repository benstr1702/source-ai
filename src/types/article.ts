// types/article.ts
import { z } from "zod";
export type ServerFile = {
	name: string;
	size: number;
	type: string;
};
// types/article.ts
export const ArticleSchema = z.object({
	headline: z.string(),
	dateline: z.string(),
	author: z.object({
		name: z.string(),
		title: z.string(),
	}),
	featuredImage: z.object({
		url: z.string(),
		caption: z.string(),
	}),
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
	success: boolean;
	article?: z.infer<typeof ArticleSchema>; // Use the Zod inference here too
	error?: string;
};
