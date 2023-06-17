import { useAPI } from '~/composables';
import { AllArticles, GetAllArticlesProps } from '~/types';

export const getAllArticles = (props: GetAllArticlesProps = {}) => {
	return useAPI<AllArticles>('/articles', { query: { ...props, limit: props.limit || 20 } });
};
