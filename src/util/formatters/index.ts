import type { Article } from "@/types/article";
import type { PublicationType } from "@/types/form";
import { getRandomTimeAgo } from "@/util/helpers/dateFormatters";

function formatBBCArticle(article: Article): string {
	return `
    <article class="max-w-[720px] mx-auto px-4 font-serif">
      <header class="mb-8">
        <h1 class="text-3xl font-normal mb-4 max-h-[52px] line-clamp-2">
          ${article.headline}
        </h1>
        
        <div class="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <span>${getRandomTimeAgo()}</span>
          <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>By ${article.author.name}</span>
        </div>
      </header>
      <div class="prose max-w-none">
        ${article.article_body
			.map(
				(para) => `
          <p class="mb-4 text-base leading-relaxed">
            ${para.topic_sentence} ${para.content}
          </p>
        `
			)
			.join("")}
      </div>
      <footer class="mt-8 pt-4 border-t text-sm text-gray-600">
        <p>${article.disclaimer}</p>
      </footer>
    </article>
  `;
}

function formatNYTArticle(article: Article): string {
	return `
    <article class="max-w-[720px] mx-auto px-4 font-serif">
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4 leading-tight">
          ${article.headline}
        </h1>
        
        <div class="mb-4 text-sm">
          <div class="text-gray-600">${getRandomTimeAgo()}</div>
          <div class="mt-2">
            <span class="font-bold">By ${article.author.name}</span>
            <span class="text-gray-600 italic ml-2">${
				article.author.title
			}</span>
          </div>
        </div>
      </header>
      <div class="prose max-w-none text-lg">
        ${article.article_body
			.map(
				(para) => `
          <p class="mb-5 leading-relaxed">
            ${para.topic_sentence} ${para.content}
          </p>
        `
			)
			.join("")}
      </div>
      <footer class="mt-8 pt-4 border-t text-sm text-gray-600 italic">
        <p>${article.disclaimer}</p>
      </footer>
    </article>
  `;
}

function formatWSJArticle(article: Article): string {
	return `
	  <article class="max-w-[720px] mx-auto px-4" style="font-family: 'Exchange', Georgia, serif; font-weight: 400; font-size: 17px; line-height: 27px; color: rgb(232, 228, 221);">
		<header class="mb-8">
		  <h1 class="text-3xl mb-4" style="font-family: 'Escrow Condensed', 'Times New Roman', serif; font-weight: 700; font-size: 40px; line-height: 40px; color: rgb(232, 228, 221);">
			${article.headline}
		  </h1>
		  
		  <div class="flex flex-col text-sm mb-4">
			<div class="text-gray-600">${getRandomTimeAgo()}</div>
			<div class="mt-1">
			  <span class="font-medium">By ${article.author.name}</span>
			  <span class="text-gray-600">, ${article.author.title}</span>
			</div>
		  </div>
		</header>
		<div class="prose max-w-none">
		  ${article.article_body
				.map(
					(para) => `
			<p class="mb-4">
			  ${para.topic_sentence} ${para.content}
			</p>
		  `
				)
				.join("")}
		</div>
		<footer class="mt-8 pt-4 border-t text-xs text-gray-600">
		  <p>${article.disclaimer}</p>
		</footer>
	  </article>
	`;
}

function formatAJZArticle(article: Article): string {
	return `
    <article class="max-w-[720px] mx-auto px-4 font-sans">
      <header class="mb-8">
        <h1 class="text-3xl font-bold mb-4">
          ${article.headline}
        </h1>
        
        <div class="space-y-2 text-sm">
          <div class="flex items-center space-x-2 text-gray-600">
            <span>${getRandomTimeAgo()}</span>
            <span>•</span>
            <span>${article.dateline}</span>
          </div>
          <div>
            <span class="font-medium">${article.author.name}</span>
            <span class="text-gray-600">, ${article.author.title}</span>
          </div>
        </div>
      </header>
      <div class="prose max-w-none">
        ${article.article_body
			.map(
				(para) => `
          <p class="mb-4 text-base leading-relaxed">
            ${para.topic_sentence} ${para.content}
          </p>
        `
			)
			.join("")}
      </div>
      <footer class="mt-8 pt-4 border-t text-sm text-gray-600">
        <p>${article.disclaimer}</p>
      </footer>
    </article>
  `;
}

export function formatArticle(
	article: Article,
	publication: PublicationType
): string {
	switch (publication) {
		case "bbc":
			return formatBBCArticle(article);
		case "nyt":
			return formatNYTArticle(article);
		case "wsj":
			return formatWSJArticle(article);
		case "ajz":
			return formatAJZArticle(article);
		default:
			throw new Error(`Unsupported publication: ${publication}`);
	}
}
