<script setup lang="ts">
import { useRoute } from '#imports';
import IndexFeedPage from '~/pages/profile/feed/index.vue';

const route = useRoute();
</script>

<template>
	<Head>
		<Title>Nuxt3 Realworld | page {{ route.params.pageNumber }}</Title>
	</Head>

	<IndexFeedPage />
</template>
