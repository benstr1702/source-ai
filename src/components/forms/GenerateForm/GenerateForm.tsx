"use client";
import { useRouter } from "next/navigation";
import { ToneType, BiasType, PublicationType } from "@/types/form";
import React, { FormEvent, useState } from "react";
import type { FormData } from "@/types/form";
import type { Article, GenerateArticleResponse } from "@/types/article";
import { formatArticle } from "@/util/formatters";
import { PromptInput } from "./components/PromptInput";
import { ToneSelect } from "./components/ToneSelect";
import { BiasSelect } from "./components/BiasSelect";
import { ImageUpload } from "./components/ImageUpload";
import { useArticle } from "@/context/ArticleContext";
import { PublicationSelect } from "./components/PublicationSelect";
import { ArticleSchema } from "@/types/article";
import { SubmitButton } from "./components/SubmitButton";
import type { ImageData } from "../GenerateForm/components/ImageUpload";
export function GenerateForm() {
	const { setArticleContent, setArticleImage: setContextArticleImage } =
		useArticle(); // Add this line

	const [isLoading, setIsLoading] = useState(false);
	const [article, setArticle] = useState<string | null>(null);
	const [errors, setErrors] = useState<string | null>(null);
	const [articleImage, setArticleImage] = useState<ImageData | null>(null);
	const router = useRouter();
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
			const file = formData.get("image") as File;
			if (file?.size) {
				const imageFormData = new FormData();
				imageFormData.append("file", file);
				await fetch("/api/upload", {
					method: "POST",
					body: imageFormData,
				});
			}
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).catch((err) => {
				console.log("Fetch error:", err);
				throw err;
			});
			console.log("Sending data:", data);

			if (!response.ok) {
				const errorText = await response.text();
				console.log("Error response:", errorText);
				throw new Error("Failed to generate article");
			}

			const result = (await response.json()) as GenerateArticleResponse;

			if (result.success && result.article) {
				try {
					// Validate the article structure
					const validArticle = ArticleSchema.parse(result.article);

					const formattedArticle = formatArticle(
						validArticle,
						data.publication
					);
					console.log("Setting article image:", articleImage); // Add this
					setArticleContent(formattedArticle); // This line was missing!

					setContextArticleImage(
						articleImage || {
							file: null as unknown as File, // since we don't have a file for default image
							dataURL: "/breaking.png",
						}
					);
					console.log("Pushing to /article"); // Add this

					router.push("/article");

					// setArticle(formattedArticle);
				} catch (error) {
					setErrors("Article data is invalid");
				}
			} else {
				setErrors(result.error || "Failed to generate article");
			}
		} catch (error) {
			setErrors(
				error instanceof Error ? error.message : "Something went wrong"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			<h2>Create Your Article</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<PromptInput />
				<div className="flex gap-4">
					<ToneSelect />
					<BiasSelect />
					<PublicationSelect />
					<ImageUpload onImageChange={setArticleImage} />
				</div>
				<SubmitButton />
				{isLoading && (
					<div className="text-center">
						<p>Generating article...</p>
					</div>
				)}
			</form>

			{errors && (
				<div className="p-4 bg-red-50 text-red-500 rounded">
					{errors}
				</div>
			)}

			{article && (
				<div className="p-4 bg-white rounded shadow">
					<div dangerouslySetInnerHTML={{ __html: article }} />
				</div>
			)}
		</div>
	);
}
