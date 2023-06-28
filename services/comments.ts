import { useAPI } from '~/composables';
import { Comment, CommentsData } from '~/types';

export const getArticleComments = (slug: string) => {
	return useAPI<CommentsData>(`/articles/${slug}/comments`);
};

export const deleteCommetById = (slug: string, id: number) => {
	return useAPI<object>(`/articles/${slug}/comments/${id}`, { method: 'DELETE' });
};

export const createNewComments = (slug: string, data: string) => {
	return useAPI<{ comment: Comment }>(`/articles/${slug}/comments?cache=false`, {
		method: 'POST',
		body: { comment: { body: data } },
	});
};
