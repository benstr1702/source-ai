"use client";
import { useState, ChangeEvent } from "react";
export type ImageData = {
	file: File;
	dataURL: string;
} | null;
export function ImageUpload({
	onImageChange,
}: {
	onImageChange: (data: ImageData | null) => void;
}) {
	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);

	function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) {
			onImageChange(null);
			return;
		}

		if (!file.type.startsWith("image/")) {
			setError("Please select an image");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			setError("Image must be less than 5MB");
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			onImageChange({
				file,
				dataURL: reader.result as string,
			});
		};
		reader.readAsDataURL(file);

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
				className="w-full"
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
}
