import { computed, useRoute } from '#imports';
import { LocationQueryValue } from '~/.nuxt/vue-router';
import { useAPI } from '~/composables';
import { PAGE_SIZE_LIMIT } from '~/constants';
import { AllArticles } from '~/types';

export const getAllArticles = () => {
	const route = useRoute();

	const queries = computed(() => {
		const query = route.query as Record<string, LocationQueryValue>;
		const pageNumberParam = (route.params.pageNumber || '1') as string;

		const tag = query.tag;
		const author = query.author;
		const favorited = query.favorited;
		const limit = parseInt(query.limit || PAGE_SIZE_LIMIT, 10);
		const page = (parseInt(pageNumberParam, 10) - 1) * limit;

		return {
			tag,
			author,
			favorited,
			limit,
			offset: page,
		};
	});

	return useAPI<AllArticles>('/articles', {
		query: queries,
		watch: [queries],
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
