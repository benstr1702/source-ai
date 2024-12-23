export type ToneType = "sensational" | "academic" | "neutral";
export type BiasType = "political" | "cultural" | "none";
export type PublicationType = "wsj" | "nyt" | "ajz" | "bbc";

export type FormData = {
	prompt: string;
	tone: ToneType;
	bias: BiasType;
	publication: PublicationType;
	image?: File;
};
