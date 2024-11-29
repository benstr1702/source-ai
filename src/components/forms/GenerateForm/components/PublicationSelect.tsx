// components/forms/GenerateForm/components/PublicationSelect.tsx
"use client";
import { useState } from "react";
import { PUBLICATIONS } from "@/constants/form";

export function PublicationSelect() {
	const [publication, setPublication] = useState("wsj");

	return (
		<select
			value={publication}
			name="publication"
			onChange={(e) => setPublication(e.target.value)}
			className="p-2 border rounded text-black w-32 h-10"
		>
			{Object.values(PUBLICATIONS).map(
				({ value, label, description }) => (
					<option
						key={value}
						value={value}
						title={description} // shows description on hover
					>
						{label}
					</option>
				)
			)}
		</select>
	);
}
