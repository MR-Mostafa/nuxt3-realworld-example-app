<script setup lang="ts">
import { computed, ref } from '#imports';
import { farHeart } from '@quasar/extras/fontawesome-v5';
import { useNotify } from '~/composables';
import { addFavoriteArticle, removeFavoriteArticle } from '~/services';
import { authState } from '~/store';

const auth = authState();
const props = defineProps<{ favoritesCount: number; isFavorited: boolean; slug: string }>();
const isLoading = ref(false);
const isFavorited = ref(props.isFavorited);
const favoritesCount = ref(props.favoritesCount);

const handleLike = computed(() => {
	return () => {
		const isLogin = auth.get.value;

		if (!isLogin) {
			return useNotify({ message: 'You need to log in to your account.', type: 'error' });
		}

		isLoading.value = true;

		const fetchFn = isFavorited.value ? removeFavoriteArticle(props.slug) : addFavoriteArticle(props.slug);

		return fetchFn
			.then((res) => {
				const data = res.data.value;
				const error = res.error.value;

				if (data) {
					isFavorited.value = data.article.favorited;
					favoritesCount.value = data.article.favoritesCount;

					return useNotify({ message: 'Your favorites list has been updated.', type: 'success' });
				}

				if (error) {
					return useNotify({ message: error.message, type: 'error' });
				}
			})
			.finally(() => {
				isLoading.value = false;
			});
	};
});
</script>

<template>
	<q-btn
		:icon="farHeart"
		:label="favoritesCount"
		:class="[$style.btnLike, { [$style.activeLike]: isFavorited }]"
		:loading="isLoading"
		@click="handleLike"
	>
		<q-tooltip :offset="[5, 5]">{{ isFavorited ? 'Unlike' : 'Like' }}</q-tooltip>
	</q-btn>
</template>

<style lang="scss" module>
.btnLike {
	background-color: #d1caff;
	color: #252d3a;
}

.activeLike {
	background-color: #fc728b;
	color: #fff;
} // .activeLike
</style>
