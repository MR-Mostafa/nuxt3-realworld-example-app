export interface Article {
	slug: string;
	title: string;
	description: string;
	body: string;
	tagList: string[];
	createdAt: string;
	updatedAt: string;
	favorited: boolean;
	favoritesCount: number;
	author: {
		username: string;
		bio: string;
		image: string;
		following: boolean;
	};
}

export interface AllArticles {
	articles: Article[];
	articlesCount: number;
}

export interface GetAllArticlesProps {
	tag?: string;
	author?: string;
	favorited?: string;
	offset?: number;
	limit?: number;
}
