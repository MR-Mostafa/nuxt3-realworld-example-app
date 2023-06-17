<script setup lang="ts">
import { fasHashtag } from '@quasar/extras/fontawesome-v5';

const props = defineProps<{ tagList: string[] }>();
</script>

<template>
	<q-list tag="ul" dense :class="$style.tagsWrapper" class="flex inline row no-wrap text-body2 items-center justify-end">
		<q-item v-for="(item, index) in props.tagList" :key="index" dense tag="li">
			<q-btn dense flat no-caps :icon="fasHashtag" :label="item" :to="`/?tag=${item}`" />
		</q-item>
	</q-list>
</template>

<style lang="scss" module>
.tagsWrapper {
	:global {
		.q-item {
			min-height: auto;
			padding: 4px 4px 4px 5px;
			position: relative;
		} // .q-item

		.q-icon {
			font-size: 0.75rem;
		}
	} // :global
} // .tagsWrapper
</style>
