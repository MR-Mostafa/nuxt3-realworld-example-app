import { LocationQueryValue } from '~/.nuxt/vue-router';

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
	tag?: LocationQueryValue | LocationQueryValue[];
	author?: LocationQueryValue | LocationQueryValue[];
	favorited?: LocationQueryValue | LocationQueryValue[];
	offset?: LocationQueryValue | LocationQueryValue[];
	limit?: LocationQueryValue | LocationQueryValue[];
}

export interface NewArticle {
	title: string;
	description: string;
	body: string;
	tagList: string[];
}
