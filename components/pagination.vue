<script setup lang="ts">
import { ref } from '#imports';
import { RouteLocationRaw } from '~/.nuxt/vue-router';

const props = withDefaults(defineProps<{ currentPage?: number; totalPage: number; handlePageLink: (page: number) => RouteLocationRaw }>(), {
	currentPage: 1,
});

const currentPage = ref(props.currentPage);
</script>

<template>
	<div class="q-pa-lg flex flex-center" :class="$style.pagination">
		<q-pagination
			v-model="currentPage"
			flat
			unelevated
			ellipses
			gutter="8px"
			active-c
			:max="props.totalPage"
			max-pages="15"
			:to-fn="props.handlePageLink"
		/>
	</div>
</template>

<style lang="scss" module>
.pagination {
	:global {
		.q-btn {
			font-size: 18px;
			padding: 3px 2px;
			background-color: #33394f;
			color: #d9d9d9 !important;
		}

		.bg-primary {
			background-color: #252d3a !important;
			color: #fff !important;
			pointer-events: none;
		}
	} // :global
} // .pagination
</style>
