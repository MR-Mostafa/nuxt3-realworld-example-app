<script setup lang="ts">
import { useRoute } from '#imports';
import { RouteLocationRaw } from '~/.nuxt/vue-router';
import { getArticlesFeed } from '~/services';

const route = useRoute();

const { data: allArticles, pending, error } = await getArticlesFeed();

const createPageLink = (page: number): RouteLocationRaw => {
	const pastQuery = route.query;

	return { query: { ...pastQuery }, path: `/profile/feed/page/${page}` };
};
</script>

<template>
	<Head>
		<Title>Nuxt3 Realworld | feed - page {{ route.params.pageNumber }}</Title>
	</Head>

	<div class="flex row q-gutter-x-lg">
		<main class="col" :class="$style.main">
			<p class="text-h4 q-pb-lg">My Feed:</p>
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
