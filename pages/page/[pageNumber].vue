<script setup lang="ts">
import { useRoute } from '#imports';
import IndexPage from '~/pages/index.vue';

const route = useRoute();
</script>

<template>
	<Head>
		<Title>Nuxt3 Realworld | page {{ route.params.pageNumber }}</Title>
	</Head>

	<IndexPage />
</template>
