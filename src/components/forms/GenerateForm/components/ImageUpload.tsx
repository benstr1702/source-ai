"use client";
import { ChangeEvent, useState } from "react";

export function ImageUpload() {
	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}
		if (!file.type.startsWith("image/")) {
			setError("Please select an image");
		}
		if (file.size > 5 * 1024 * 1024) {
			setError("Image must be less than 5MB");
			return;
		}

		setError(null);
		setImage(file);
	}
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium mb-2">
				Custom Article Image (optional)
			</label>
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className="p-2 border rounded text-black w-32 h-10"
			/>
		</div>
	);
}
