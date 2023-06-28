import { computed, useRoute } from '#imports';
import { ComputedRef } from 'nuxt/dist/app/compat/vue-demi';
import { LocationQueryValue } from '~/.nuxt/vue-router';
import { useAPI } from '~/composables';
import { PAGE_SIZE_LIMIT } from '~/constants';
import { AllArticles, Article, NewArticle } from '~/types';

interface GetAllArticlesProps {
	tag?: LocationQueryValue;
	author?: LocationQueryValue;
	favorited?: LocationQueryValue;
	limit: number;
	offset: number;
}

export const getAllArticles = (queries: ComputedRef<GetAllArticlesProps>, server = true) => {
	return useAPI<AllArticles>('/articles', {
		query: queries,
		watch: [queries],
		server,
	});
};

export const getArticlesFeed = () => {
	const route = useRoute();

	const queries = computed(() => {
		const query = route.query as Record<string, LocationQueryValue>;
		const pageNumberParam = (route.params.pageNumber || '1') as string;

		const limit = parseInt(query.limit || PAGE_SIZE_LIMIT, 10);
		const page = (parseInt(pageNumberParam, 10) - 1) * limit;

		return {
			limit,
			offset: page,
		};
	});

	return useAPI<AllArticles>('/articles/feed', {
		query: queries,
		watch: [queries],
	});
};

export const getSingleArticle = (slug: string) => {
	return useAPI<{ article: Article }>(`/articles/${slug}`);
};

export const createNewArticle = (data: NewArticle) => {
	return useAPI<Article>('/articles', { method: 'POST', body: { article: data } });
};

export const updateArticle = (slug: string, data: NewArticle) => {
	return useAPI<Article>(`/articles/${slug}`, { method: 'PUT', body: { article: data } });
};

export const deleteArticle = (slug: string) => {
	return useAPI<object>(`/articles/${slug}?cache=false`, { method: 'DELETE' });
};
