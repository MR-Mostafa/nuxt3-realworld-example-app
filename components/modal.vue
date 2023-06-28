<script setup lang="ts">
import { fasTimes } from '@quasar/extras/fontawesome-v5';

const props = defineProps<{ show: boolean; title: string; hide: () => void }>();
</script>

<template>
	<q-dialog :model-value="props.show" persistent @hide="hide">
		<q-card>
			<q-card-section class="row items-center q-pb-none header">
				<div class="text-h6">{{ props.title }}</div>
				<q-space />
				<q-btn v-close-popup :icon="fasTimes" flat round dense />
			</q-card-section>
			<q-card-section class="body">
				<slot></slot>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<style lang="scss">
.q-dialog {
	.q-card {
		min-width: 60vw;
		max-width: 80vw;
		min-height: 60vh;
		max-height: 80vh;
		background-color: #252d3a;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: start;
		justify-content: start;
		border-radius: 15px;
		box-shadow: 10px 10px 0px 0px rgba(2, 2, 2, 0.45);
	}

	.header {
		width: 100%;
		height: 60px;
		flex: 60px 0 0;
		border-bottom: 1px dashed #fff3;
		padding-top: 0;
	}

	.body {
		width: 100%;
		flex: auto 1 1;
		overflow: auto;
	}
} // .q-dialog
</style>
