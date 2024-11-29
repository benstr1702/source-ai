// app/generate/page.tsx
import Link from "next/link";
import { GenerateForm } from "@/components/forms/GenerateForm/GenerateForm";

export default function GenerateArticlePage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-8">Generate an Article</h1>
			<GenerateForm />
		</div>
	);
}
