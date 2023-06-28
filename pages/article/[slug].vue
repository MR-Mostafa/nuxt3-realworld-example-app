<script setup lang="ts">
import { computed, useRoute } from '#imports';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { getSingleArticle } from '~/services';

const route = useRoute();

const slug = computed(() => {
	return route.params.slug as string;
});

const { data, error, pending } = await getSingleArticle(slug.value);
</script>

<template>
	<template v-if="data && data.article && !pending">
		<q-card tag="article" square flat :class="$style.article">
			<q-card-section>
				<header>
					<h1 class="text-h5">
						<NuxtLink :to="`/article/${slug}`" class="text-white">{{ data.article.title }}</NuxtLink>
					</h1>

					<div class="flex row items-center justify-between q-py-md q-mb-sm">
						<Avatar :avatar-src="data.article.author.image" :date="data.article.createdAt" :username="data.article.author.username" />

						<div class="flex row items-center justify-between">
							<Like :favorites-count="data.article.favoritesCount" :is-favorited="data.article.favorited" :slug="data.article.slug" />

							<Follow class="q-ml-md" :user-name="data.article.author.username" :is-follow="data.article.author.following" />
						</div>
					</div>
				</header>

				<div class="text-h6 text-weight-light" :class="$style.articleContent" v-html="sanitizeHtml(marked.parse(data.article.body))" />

				<footer class="q-pt-lg flex row items-center justify-between">
					<ArticleTags :tag-list="data.article.tagList" />
				</footer>
			</q-card-section>
		</q-card>

		<q-separator :class="$style.separator" />

		<div :class="$style.commentsWrapper">
			<div class="">
				<p class="flex row items-center justify-start q-pb-lg">
					<span class="text-h5 q-pr-md">Responses</span>
					<span class="number text-h6">25</span>
				</p>
			</div>
			<AddComment />

			<Comments />
			<Comments />
			<Comments />
			<Comments />
		</div>
	</template>

	<ErrorBox v-if="error" :error="error" :msg="error?.message" />
</template>

<style lang="scss" module>
.article {
	background-color: transparent;
} // .article

.articleContent {
	* {
		font-size: 1.2rem;
		font-weight: 300;
		line-height: 1.9rem;
		letter-spacing: 0.0125em;
		color: #fff;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 2rem;
		letter-spacing: normal;
		padding-bottom: 16px;
	}

	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 1.25rem;
		font-weight: 400;
		line-height: 2rem;
		letter-spacing: normal;
		padding-bottom: 16px;
	}

	blockquote {
		margin: 1em 0;
		border-left: 5px solid #ffffffcf;
		padding: 0 40px;
	}

	a {
		color: #ffffffcf;
		text-decoration: underline;
		text-underline-position: under;

		&:hover,
		&:focus {
			color: #fff;
		}
	}

	ul {
		padding-left: 20px;
	}
} // .previewMarkdown

.separator {
	height: 4px;
	background-color: #33394f;
	margin: 0.5rem 0 1.5rem;
}

.commentsWrapper {
	:global {
		.number {
			background-color: #d1caff;
			border-radius: 5px;
			color: #000;
			width: 34px;
			height: 34px;
			text-align: center;
		}
	} // :global
} // .commentsWrapper
</style>
