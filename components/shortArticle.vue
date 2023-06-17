<script setup lang="ts">
import { Article } from '~/types';

const props = defineProps<Article>();
</script>
<template>
	<q-card tag="article" :class="$style.article">
		<q-card-section class="q-pa-lg">
			<header>
				<h1 class="text-h5">
					<NuxtLink :to="`/article/${props.slug}`" class="text-white">{{ props.title }} </NuxtLink>
				</h1>

				<div class="flex row items-center justify-between q-py-md q-mb-sm">
					<Avatar :avatar-src="props.author.image" :username="props.author.username" :date="props.createdAt" />
					<Like :favorites-count="props.favoritesCount" :is-favorited="props.favorited" :slug="props.slug" />
				</div>
			</header>

			<p class="text-h6 text-weight-light">{{ props.description }}</p>

			<footer class="q-pt-lg flex row items-center justify-between">
				<BtnMore :href="`/article/${props.slug}`" />
				<ArticleTags :tag-list="props.tagList" class="q-pl-lg" />
			</footer>
		</q-card-section>
	</q-card>
</template>

<style lang="scss" module>
.article {
	background: #252d3a;
	box-shadow: 10px 10px 0px rgba(2, 2, 2, 0.45);
	border-radius: 15px;

	& + .article {
		margin-top: 2.5rem;
	}

	:global {
		h1 {
			overflow: hidden;
			max-height: 64px;

			a {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
} // .article
</style>
