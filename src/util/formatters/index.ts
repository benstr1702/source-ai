// utils/formatters/index.ts
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
	// NYT specific styling
	return `...NYT style...`;
}

function formatWSJArticle(article: Article): string {
	// WSJ specific styling
	return `...WSJ style...`;
}

function formatAJZArticle(article: Article): string {
	// Al Jazeera specific styling
	return `...AJZ style...`;
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
