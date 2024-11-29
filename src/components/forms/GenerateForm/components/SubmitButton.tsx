"use client";
import { useState } from "react";

export function SubmitButton() {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<button
			type="submit"
			disabled={isLoading}
			className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
		>
			{isLoading ? "Generating..." : "Generate Article"}
		</button>
	);
}
