"use client";
import { useState } from "react";

export function PromptInput() {
	const [prompt, setPrompt] = useState("");

	return (
		<div className="space-y-2">
			<label htmlFor="prompt" className="block text-sm  font-medium">
				Enter your prompt
			</label>
			<textarea
				id="prompt"
				name="prompt"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				placeholder="Write what you want the article to be about..."
				className="w-full p-2 border rounded-md min-h-[100px] text-black"
			/>
		</div>
	);
}
