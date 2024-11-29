"use client";
import { useState } from "react";
import { TONES } from "@/constants/form";

export function ToneSelect() {
	const [tone, setTone] = useState("neutral");

	return (
		<select
			value={tone}
			name="tone"
			onChange={(e) => setTone(e.target.value)}
			className="p-2 border rounded text-black w-32 h-10"
		>
			{Object.values(TONES).map(({ value, label }) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</select>
	);
}
