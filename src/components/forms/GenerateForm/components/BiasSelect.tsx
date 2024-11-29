"use client";
import { useState } from "react";
import { BIASES } from "@/constants/form";

export function BiasSelect() {
	const [bias, setBias] = useState("none");
	return (
		<select
			value={bias}
			name="bias"
			onChange={(e) => setBias(e.target.value)}
			className="p-2 border rounded text-black w-32 h-10"
		>
			{Object.values(BIASES).map(({ value, label }) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</select>
	);
}
