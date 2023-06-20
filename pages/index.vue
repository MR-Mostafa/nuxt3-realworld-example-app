<script setup lang="ts">
import { computed, useRoute } from '#imports';
import { LocationQueryValue, RouteLocationRaw } from '~/.nuxt/vue-router';
import { PAGE_SIZE_LIMIT } from '~/constants';
import { getAllArticles } from '~/services';

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

const { data: allArticles, pending, error } = await getAllArticles(queries);

const createPageLink = (page: number): RouteLocationRaw => {
	const pastQuery = route.query;

	return { query: { ...pastQuery }, path: `/page/${page}` };
};
</script>

<template>
	<div class="flex row q-gutter-x-lg">
		<main class="col" :class="$style.main">
			<ShortArticlesSection :data="allArticles" :pending="pending" :error="error" :handle-create-page-link="createPageLink" />
		</main>

		<Aside class="col-4 q-pl-lg" />
	</div>
</template>

<style lang="scss" module>
.main {
	:global {
		.q-tabs__content {
			border-bottom: 4px solid #33394f;
			justify-content: flex-start;
			margin-bottom: 1.5rem;
		} // .q-tabs__content

		.q-tab {
			min-height: 54px;
			padding: 0px 20px;

			& + .q-tab {
				margin-left: 0.25rem;
			}
		} // .q-tab

		.q-tab__content {
			padding: 1rem 0.5rem;
		}

		.q-tab__label {
			padding: 0.5rem;
		}

		.q-tab__indicator {
			background: #7b61ff;
			border-radius: 2px;
			height: 6px;
		} // .q-tab__indicator

		.q-tab-panels {
			background-color: transparent;
		}
		.q-tab-panel {
			padding: 0;
			padding-right: 13px;
		}

		a {
			&:hover,
			&:focus {
				opacity: 0.9;
			}
		}
	} // :global
} // .main
</style>
