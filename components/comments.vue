<script setup lang="ts">
import { fasTrashAlt } from '@quasar/extras/fontawesome-v5';
</script>

<template>
	<div :class="$style.comments">
		<div class="flex row items-center justify-between">
			<Avatar />
			<q-btn dense rounded unelevated text-color="white" :icon="fasTrashAlt" />
		</div>

		<p class="text-body1 text-weight-light q-pt-sm">Comment Text ...</p>
	</div>
</template>

<style lang="scss" module>
.comments {
	margin-top: 1.75rem;

	& + .comments {
		padding-top: 1.75rem;
		border-top: 2px dashed rgb(18 21 32 / 50%);
	}

	:global {
		.q-btn {
			width: 40px;
			height: 40px;
		}
		.q-icon {
			font-size: 1.1rem;
		} // .q-icon
	} // :global
} // .comments
</style>
