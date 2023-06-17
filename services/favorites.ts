import { useAPI } from '~/composables';
import { FavoritedArticle } from '~/types';

/**
 * @description
 * Adds an article from the user's favorites list.
 */
export const addFavoriteArticle = (slug: string) => {
	return useAPI<FavoritedArticle>(`/articles/${slug}/favorite`, { method: 'POST' });
};

/**
 * @description
 * Removes an article from the user's favorites list.
 */
export const removeFavoriteArticle = (slug: string) => {
	return useAPI<FavoritedArticle>(`/articles/${slug}/favorite`, { method: 'DELETE' });
};
