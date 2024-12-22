"use client";
import { createContext, useContext, ReactNode, useState } from "react";
import { ImageData } from "@/components/forms/GenerateForm/components/ImageUpload";

type ArticleMetadata = {
	timestamp: string;
	author?: string;
};

type ArticleContextType = {
	articleContent: string | null;
	articleImage: ImageData | null;
	metadata: ArticleMetadata | null;
	setArticleContent: (content: string | null) => void;
	setArticleImage: (image: ImageData | null) => void;
	setMetadata: (metadata: ArticleMetadata | null) => void;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: ReactNode }) {
	const [articleContent, setArticleContent] = useState<string | null>(null);
	const [articleImage, setArticleImage] = useState<ImageData | null>(null);
	const [metadata, setMetadata] = useState<ArticleMetadata | null>(null);

	return (
		<ArticleContext.Provider
			value={{
				articleContent,
				articleImage,
				metadata,
				setArticleContent,
				setArticleImage,
				setMetadata,
			}}
		>
			{children}
		</ArticleContext.Provider>
	);
}

export function useArticle() {
	const context = useContext(ArticleContext);
	if (context === undefined) {
		throw new Error("useArticle must be used within an ArticleProvider");
	}
	return context;
}

// Helper function to generate random timestamp
export function generateRandomTimestamp(): string {
	const times = [
		"Just now",
		"5 minutes ago",
		"15 minutes ago",
		"30 minutes ago",
		"1 hour ago",
		"2 hours ago",
		"3 hours ago",
		"4 hours ago",
		"5 hours ago",
		"6 hours ago",
	];
	return times[Math.floor(Math.random() * times.length)];
}

// Helper function to get random author (if needed)
export function generateRandomAuthor(): string {
	const authors = [
		"International Affairs Correspondent",
		"Political Analyst",
		"Senior Editor",
		"Staff Writer",
		"Special Correspondent",
	];
	return authors[Math.floor(Math.random() * authors.length)];
}
