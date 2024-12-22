"use client";
import { useArticle } from "@/context/ArticleContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ArticlePage() {
	const { articleContent, articleImage } = useArticle();
	const router = useRouter();

	useEffect(() => {
		if (!articleContent) {
			router.push("/");
		}
	}, [articleContent, router]);

	if (!articleContent) {
		return null;
	}

	// Clean up the content by removing unnecessary HTML tags
	const cleanContent = articleContent
		.replace(/<\/?div[^>]*>/g, "")
		.replace(/<\/?header[^>]*>/g, "")
		.replace(/<\/?footer[^>]*>/g, "")
		.replace(/<\/?span[^>]*>/g, "")
		.replace(/<\/?article[^>]*>/g, "")
		.replace(/<\/?p[^>]*>/g, "")
		.replace(/class="[^"]*"/g, "");

	const firstSplit = cleanContent.split(/\d+ hours ago/);
	const titlePart = firstSplit[0];
	const remainingContent = firstSplit[1] || "";
	const [authorPart, ...contentParts] =
		remainingContent.split(/By .+ Staff Writer/);
	const bodyContent = contentParts.join("");

	return (
		<article className="max-w-4xl mx-auto p-6">
			{/* Title */}
			<header className="mb-6">
				<h1
					className="font-roboto text-4xl font-bold leading-tight"
					dangerouslySetInnerHTML={{ __html: titlePart.trim() }}
				/>

				{/* Metadata section */}
				<div className="text-gray-500 mt-2">{authorPart.trim()}</div>
			</header>

			{/* Image after metadata */}
			{articleImage && (
				<div className="mb-8">
					<Image
						src={articleImage.dataURL}
						alt="Article header image"
						width={800}
						height={400}
						className="w-full h-[400px] object-cover rounded-lg"
						priority
					/>
				</div>
			)}

			{/* Main content */}
			<div
				style={{
					fontFamily: "Georgia, serif",
					fontWeight: 400,
					fontSize: "1.125rem",
					lineHeight: "1.75",
				}}
				dangerouslySetInnerHTML={{
					__html: bodyContent
						.split("</p>")
						.map((p) => p.trim())
						.filter((p) => p)
						.map(
							(p) =>
								`<p class="mb-5">${p.replace(
									/<p[^>]*>/g,
									""
								)}</p>`
						)
						.join("\n"),
				}}
			/>

			{/* Footer */}
			<footer className="mt-8 pt-4 border-t text-sm text-gray-600 italic">
				<p>
					This article is a fictional representation and does not
					reflect real events.
				</p>
			</footer>
		</article>
	);
}
