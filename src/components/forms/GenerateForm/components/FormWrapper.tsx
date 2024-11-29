"use client";
import { ToneType, BiasType, PublicationType } from "@/types/form";
import { FormEvent, useState } from "react";
import type { FormData } from "@/types/form";
import type {
	Article,
	ArticleParagraph,
	GenerateArticleResponse,
} from "@/types/article";
import { formatArticle } from "@/util/formatters";

export function FormWrapper({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(false);
	const [article, setArticle] = useState<string | null>(null);
	const [errors, setErrors] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors(null);

		try {
			const formData = new FormData(e.currentTarget);
			const data: FormData = {
				prompt: formData.get("prompt") as string,
				tone: formData.get("tone") as ToneType,
				bias: formData.get("bias") as BiasType,
				publication: formData.get("publication") as PublicationType,
			};

			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to generate article");
			}

			// Need to handle the response! 👈
			const result = await response.json();
			console.log(article);
			if (result.article) {
				const articleData = result.article as Article;
				const formattedArticle = formatArticle(
					articleData,
					data.publication
				);

				setArticle(formattedArticle);
			}
		} catch (error) {
			// Need to handle errors! 👈
			setErrors(
				error instanceof Error ? error.message : "Something went wrong"
			);
		} finally {
			// Need to reset loading! 👈
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			<form onSubmit={handleSubmit} className="space-y-4">
				{children}
				{/* Need to show loading state! 👈 */}
				{isLoading && (
					<div className="text-center">
						<p>Generating article...</p>
					</div>
				)}
			</form>

			{/* Need to show errors! 👈 */}
			{errors && (
				<div className="p-4 bg-red-50 text-red-500 rounded">
					{errors}
				</div>
			)}

			{/* Need to show the article! 👈 */}
			{article && (
				<div className="p-4 bg-white rounded shadow">
					<div dangerouslySetInnerHTML={{ __html: article }} />
				</div>
			)}
		</div>
	);
}
