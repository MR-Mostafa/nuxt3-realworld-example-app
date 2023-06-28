<script setup lang="ts">
import { ref } from '#imports';
import { Ref } from 'nuxt/dist/app/compat/vue-demi';
import { useNotify } from '~/composables';
import { ERROR_SEPARATOR } from '~/constants';
import { createNewArticle } from '~/services';
import { NewArticle } from '~/types';

const isLoading = ref(false);

const handleSubmitForm = (newData: Ref<NewArticle>) => {
	isLoading.value = true;

	return createNewArticle(newData.value)
		.then((res) => {
			const resData = res.data.value;
			const error = res.error.value;

			if (resData) {
				useNotify({
					message: 'A new article has been created successfully',
					type: 'success',
				});

				newData.value.title = '';
				newData.value.description = '';
				newData.value.body = '';
				newData.value.tagList = [];
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

	<p class="text-h4 q-pb-lg">Create New Article:</p>

	<AddArticle :loading="isLoading" @on-submit="handleSubmitForm" />
</template>
