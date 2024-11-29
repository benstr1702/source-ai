// app/learn/page.tsx
export default function LearnAboutDisinformationPage() {
	return (
		<>
			<title>Learn about disinformation</title>
			<div className="max-w-2xl mx-auto p-6">
				<h1 className="text-3xl font-bold mb-6">
					Understanding Disinformation
				</h1>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						What is Disinformation?
					</h2>
					<p>
						Disinformation is the{" "}
						<strong>intentional sharing of untrue content</strong>.
						It differs from misinformation, which is the
						unintentional sharing of false information.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						How Disinformation Spreads
					</h2>
					<ul className="list-disc pl-5">
						<li>Can begin with a single post or video</li>
						<li>Spreads quickly across multiple platforms</li>
						<li>Often exploits complex or ambiguous situations</li>
						<li>Targets emotional responses</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						How to Protect Yourself
					</h2>
					<ul className="list-disc pl-5">
						<li>
							Fact-check information, even from verified accounts
						</li>
						<li>
							Trust traditional news sources with established
							credibility
						</li>
						<li>Use fact-checking tools and websites</li>
						<li>Be cautious about sharing unverified content</li>
						<li>Develop critical thinking skills</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">
						Platform Solutions
					</h2>
					<ul className="list-disc pl-5">
						<li>Create friction in content sharing</li>
						<li>Prioritize accurate information over engagement</li>
						<li>Develop content origin tracking</li>
						<li>Implement industry-wide fact-checking standards</li>
					</ul>
				</section>
			</div>
		</>
	);
}
