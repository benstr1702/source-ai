export const PUBLICATION_PROMPTS = {
	nyt: {
		style_guide: `
        - Use formal, objective tone
        - Start with a strong news lead
        - Use "said" for attributions
        - Include multiple perspectives
        - Break into clear paragraphs
        - Include relevant context
      `,
		structure: {
			headline: {
				rules: "Clear, factual, no clickbait, typically 5-10 words",
			},
			dateline: {
				format: "NEW YORK, Nov. 22 —",
			},
			paragraphs: {
				style: "Topic sentence followed by supporting details, quotes, context",
			},
		},
	},

	ajz: {
		style_guide: `
        - Focus on international perspective
        - Include regional context
        - More analytical tone
        - Emphasize global implications
        - Use Middle Eastern datelines
      `,
		structure: {
			headline: {
				rules: "Direct, emphasizes international angle",
			},
			dateline: {
				format: "DOHA, Qatar, Nov. 22 (AJ) —",
			},
			paragraphs: {
				style: "Heavy emphasis on regional context and analysis",
			},
		},
	},

	bbc: {
		style_guide: `
        - Use British English spelling
        - Shorter paragraphs
        - More concise sentences
        - Include "Analysis" sections
        - Use UK date format
      `,
		structure: {
			headline: {
				rules: "Short, direct, often with colons",
			},
			dateline: {
				format: "22 November 2024",
			},
			paragraphs: {
				style: "2-3 sentences max per paragraph, include analysis boxes",
			},
		},
	},
	wsj: {
		style_guide: `
          - Focus on business and economic implications
          - Use business/financial terminology
          - Include market context and data
          - Conservative, business-focused perspective
          - Include expert analysis from market analysts
          - Numbers and statistics should be precise
          - Include company background where relevant
        `,
		structure: {
			headline: {
				rules: "Business-focused, often uses market terms, includes company names",
			},
			dateline: {
				format: "NEW YORK (WSJ) —",
			},
			paragraphs: {
				style: `
              - First paragraph summarizes business impact
              - Include market data and stock prices where relevant
              - Quote financial analysts and industry experts
              - End with market outlook or industry implications
              - Include company ticker symbols for first mention of public companies
            `,
			},
			formatting: {
				numbers:
					"Use figures for all numbers above 10, spell out below",
				companies:
					"Include stock tickers on first reference: Apple Inc. (AAPL)",
				money: "Use precise figures: $1.23 billion, not $1.2 billion",
			},
		},
	},
} as const;
