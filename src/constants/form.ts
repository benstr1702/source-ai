import type { ToneType, BiasType, PublicationType } from "@/types/form";

export const TONES: Record<
	string,
	{
		value: ToneType;
		label: string;
		description: string;
	}
> = {
	SENSATIONAL: {
		value: "sensational",
		label: "Sensational",
		description: "Dramatic, attention-grabbing style like tabloids",
	},
	ACADEMIC: {
		value: "academic",
		label: "Academic",
		description: "Formal, research-style writing",
	},
	NEUTRAL: {
		value: "neutral",
		label: "Neutral",
		description: "Balanced, factual reporting style",
	},
} as const;

export const BIASES: Record<
	string,
	{
		value: BiasType;
		label: string;
		description: string;
	}
> = {
	POLITICAL: {
		value: "political",
		label: "Political Bias",
		description:
			"Shapes article to lean towards specific political viewpoints",
	},
	CULTURAL: {
		value: "cultural",
		label: "Cultural Bias",
		description: "Shapes article based on cultural perspectives",
	},
	NONE: {
		value: "none",
		label: "No Bias",
		description: "Attempts to present info without obvious bias",
	},
} as const;

export const PUBLICATIONS: Record<
	string,
	{
		value: PublicationType;
		label: string;
		description: string;
	}
> = {
	WSJ: {
		value: "wsj",
		label: "Wall Street Journal",
		description: "Business-focused, conservative-leaning newspaper",
	},
	NYT: {
		value: "nyt",
		label: "New York Times",
		description: "Liberal-leaning newspaper known for in-depth reporting",
	},
	AJZ: {
		value: "ajz",
		label: "Al Jazeera",
		description: "Middle East perspective, international focus",
	},

	BBC: {
		value: "bbc",
		label: "BBC News",
		description: "British public broadcaster with global coverage",
	},
} as const;
