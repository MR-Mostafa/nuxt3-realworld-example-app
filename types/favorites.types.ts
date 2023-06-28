import { Article } from './article.types';

interface FavoritedBy {
	id: number;
	email: string;
	username: string;
	password: string;
	image: string;
	bio: string;
	demo: boolean;
}

export interface FavoritedArticle {
	article: Article & { favoritedBy: FavoritedBy; id: number; authorId: number }[];
}
