<script setup lang="ts">
import { fasHashtag } from '@quasar/extras/fontawesome-v5';
</script>

<template>
	<q-list tag="ul" dense :class="$style.tagsWrapper" class="flex inline row no-wrap text-body2 items-center justify-end">
		<q-item dense tag="li">
			<q-btn dense flat no-caps :icon="fasHashtag" label="tag 1" />
		</q-item>
		<q-item dense tag="li">
			<q-btn dense flat no-caps :icon="fasHashtag" label="tag 2" />
		</q-item>
		<q-item dense tag="li">
			<q-btn dense flat no-caps :icon="fasHashtag" label="tag 3" />
		</q-item>
		<q-item dense tag="li">
			<q-btn dense flat no-caps :icon="fasHashtag" label="tag 4" />
		</q-item>
		<q-item dense tag="li">
			<q-btn dense flat no-caps :icon="fasHashtag" label="tag 5" />
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
