import Link from "next/link";
export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
					<li className="mb-2">
						"No, It's because I'm so in love with you."
					</li>
					<li>"Are you an angel?"</li>
				</ol>

				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<Link href={"/generate"}>Generate Article</Link>
					<Link href={"/learn"}>
						Learn how modern disinformation is created
					</Link>
				</div>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				This project is a social experiment tool designed to demonstrate
				the ease of generating disinformation. By creating AI-generated
				articles with a watermark and disclaimer, it aims to show how
				easily people can overlook warnings and accept information at
				face value if it appears credible. Below are additional feature
				ideas and project details that could add depth and utility to
				the app.
			</footer>
		</div>
	);
}
