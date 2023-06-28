import { useAPI } from '~/composables';
import { CommentsData } from '~/types';

export const getArticleComments = (slug: string) => {
	return useAPI<CommentsData>(`/articles/${slug}/comments`);
};

export const deleteCommetById = (slug: string, id: number) => {
	return useAPI<object>(`/articles/${slug}/comments/${id}`, { method: 'DELETE' });
};
