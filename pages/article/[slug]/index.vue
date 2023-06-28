<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<script setup lang="ts">
import { computed, useRoute } from '#imports';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { getArticleComments, getSingleArticle } from '~/services';

const route = useRoute();

const slug = computed(() => {
	return route.params.slug as string;
});

const { data: articleData, error: articleError, pending: articlePending } = await getSingleArticle(slug.value);

const { data: commentsData, error: commentsError, pending: commentsPending } = await getArticleComments(slug.value);

const articleHTML = computed(() => {
	if (!articleData.value || !articleData.value.article) return '';

	const body = articleData.value.article.body.replace(/\\n/gi, '<br />');

	return sanitizeHtml(marked.parse(body, { mangle: false, headerIds: false }));
});
</script>

<template>
	<template v-if="articleData && articleData.article && !articlePending">
		<q-card tag="article" square flat :class="$style.article">
			<q-card-section>
				<header>
					<h1 class="text-h5">
						<NuxtLink :to="`/article/${slug}`" class="text-white">{{ articleData.article.title }}</NuxtLink>
					</h1>

					<div class="flex row items-center justify-between q-py-md q-mb-sm">
						<Avatar
							:avatar-src="articleData.article.author.image"
							:date="articleData.article.createdAt"
							:username="articleData.article.author.username"
						/>

						<div class="flex row items-center justify-between">
							<Like
								:favorites-count="articleData.article.favoritesCount"
								:is-favorited="articleData.article.favorited"
								:slug="articleData.article.slug"
							/>

							<Follow class="q-ml-md" :user-name="articleData.article.author.username" :is-follow="articleData.article.author.following" />
						</div>
					</div>
				</header>

				<div class="text-h6 text-weight-light" :class="$style.articleContent" v-html="articleHTML" />

				<footer class="q-pt-lg flex row items-center justify-between">
					<ArticleTags :tag-list="articleData.article.tagList" />
				</footer>
			</q-card-section>
		</q-card>

		<q-separator :class="$style.separator" />

		<div :class="$style.commentsWrapper">
			<div class="">
				<p class="flex row items-center justify-start q-pb-lg">
					<span class="text-h5 q-pr-md">Responses</span>
					<span class="number text-h6">{{ commentsData?.comments.length ?? 0 }}</span>
				</p>
			</div>

			<AddComment
				:slug="articleData.article.slug"
				@on-after-create="
					(newDate) => {
						if (!commentsData || !commentsData.comments) return;

						commentsData = { comments: [...commentsData.comments, newDate] };
					}
				"
			/>

			<template v-if="commentsData && commentsData.comments && !commentsPending">
				<Comments
					v-for="(item, index) in commentsData.comments"
					:key="index"
					:comment="item"
					:slug="articleData.article.slug"
					@on-after-delete="(id) => {
						commentsData = { comments: commentsData!.comments.filter((item) => item.id !== id)};
					}"
				/>
			</template>
			<ErrorBox v-if="commentsError" :error="commentsError" :msg="commentsError?.message" />
		</div>
	</template>

	<ErrorBox v-if="articleError" :error="articleError" :msg="articleError?.message" />
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