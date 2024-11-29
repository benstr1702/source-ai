// app/api/generate/route.ts
import OpenAI from "openai";
import { ArticleSchema } from "@/types/article";
import { zodResponseFormat } from "openai/helpers/zod";
import { PublicationType } from "@/types/form";
import { NextResponse } from "next/server";
import { PUBLICATION_PROMPTS } from "@/constants/prompts";
import type { FormData } from "@/types/form";

// Api check function
function validateEnvironment() {
	if (!process.env.OPENAI_API_KEY) {
		throw new Error("Missing OpenAI API key");
	}
}

// Initialize OpenAI after validation
validateEnvironment();
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

function getPublicationPrompt(
	publication: PublicationType,
	formData: FormData
) {
	const pubStyle = PUBLICATION_PROMPTS[publication];

	// Validate publication style exists
	if (!pubStyle) {
		throw new Error(`Invalid publication type: ${publication}`);
	}

	return {
		role: "system" as const,
		content: `
      You are writing in the style of ${publication.toUpperCase()}.
      
      Style Guide:
      ${pubStyle.style_guide}
      
      Structure Rules:
      ${JSON.stringify(pubStyle.structure, null, 2)}
      
      Tone: ${formData.tone}
      Bias: ${formData.bias}
      
      Follow these rules strictly while maintaining the publication's voice.
      Focus on factual reporting and maintaining the publication's credibility.
    `.trim(),
	};
}

export const POST = async (req: Request) => {
	try {
		// Validate request has correct content-type
		const contentType = req.headers.get("content-type");
		if (!contentType?.includes("application/json")) {
			return NextResponse.json(
				{ error: "Content-Type must be application/json" },
				{ status: 400 }
			);
		}

		const formData: FormData = await req.json();

		// Validate form data
		if (!formData.prompt?.trim()) {
			return NextResponse.json(
				{ error: "Prompt is required" },
				{ status: 400 }
			);
		}

		const completion = await openai.chat.completions
			.create({
				model: "gpt-4o-mini",
				messages: [
					getPublicationPrompt(formData.publication, formData),
					{
						role: "user",
						content: `Write an article about "${formData.prompt}"`,
					},
				],
				response_format: zodResponseFormat(ArticleSchema, "article"),
				temperature: 0.7, // Add some creativity while maintaining style
				max_tokens: 2000, // Limit response length
			})
			.catch((error) => {
				console.log("OpenAI Error:", error); // Add this

				if (error.code === "insufficient_quota") {
					throw new Error("OpenAI API quota exceeded");
				}
				throw error;
			});

		// Better null check with type guard
		const content = completion.choices[0].message.content;
		if (!content) {
			throw new Error("No content received from OpenAI");
		}
		// Parse the content
		let articleData;
		try {
			articleData = JSON.parse(content);
		} catch {
			throw new Error("Failed to parse OpenAI response");
		}
		// Validate with Zod
		const parseResult = ArticleSchema.safeParse(articleData);
		if (!parseResult.success) {
			throw new Error("Invalid article format received");
		}

		return NextResponse.json({
			article: parseResult.data,
			success: true,
		});
	} catch (error) {
		console.error("Error generating article:", error);

		// Better error handling with specific messages
		if (error instanceof Error) {
			return NextResponse.json(
				{
					error: error.message,
					success: false,
				},
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{
				error: "An unexpected error occurred",
				success: false,
			},
			{ status: 500 }
		);
	}
};
