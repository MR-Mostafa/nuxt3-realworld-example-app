<script setup lang="ts">
import { computed, definePageMeta, navigateTo, ref, useRoute } from '#imports';

import { Ref } from 'nuxt/dist/app/compat/vue-demi';
import { useNotify } from '~/composables';
import { ERROR_SEPARATOR } from '~/constants';
import { getSingleArticle, updateArticle } from '~/services';
import { authState } from '~/store';
import { NewArticle } from '~/types';

definePageMeta({
	middleware: [
		async () => {
			const route = useRoute();

			const auth = authState();
			const { data } = await getSingleArticle(route.params.slug as string);

			if (!data || !data.value) return '/';

			if (auth.get.value?.username !== data.value?.article.author.username) return '/';
		},
	],
});

const route = useRoute();
const isLoading = ref(false);

const slug = computed(() => {
	return route.params.slug as string;
});

const { data } = await getSingleArticle(slug.value);

const handleSubmitForm = (newData: Ref<NewArticle>) => {
	isLoading.value = true;

	return updateArticle(slug.value, newData.value)
		.then((res) => {
			const resData = res.data.value;
			const error = res.error.value;

			if (resData) {
				useNotify({
					message: 'A new article has been created successfully',
					type: 'success',
				});

				navigateTo(`/article/${resData.slug}`);
			}

			if (error) {
				useNotify({
					message: error.message.split(ERROR_SEPARATOR).join('<br />'),
					type: 'error',
				});
			}

			return res;
		})
		.catch((err) => {
			useNotify({
				message: 'An error has occurred, please check them again.',
				type: 'error',
			});

			console.error(err);
		})
		.finally(() => {
			isLoading.value = false;
		});
};
</script>

<template>
	<Head>
		<Title>Nuxt3 Realworld | create new article</Title>
	</Head>

	<p class="text-h4 q-pb-lg">Edit Article:</p>

	<AddArticle
		:loading="isLoading"
		:body="data?.article.body"
		:description="data?.article.description"
		:tag-list="data?.article.tagList"
		:title="data?.article.title"
		@on-submit="handleSubmitForm"
	/>
</template>
