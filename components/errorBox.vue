<script setup lang="ts">
import { ref } from '#imports';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = withDefaults(defineProps<{ msg?: string; error?: any }>(), { msg: 'Something Went Wrong', error: undefined });

const isDev = ref(process.dev);

const date = () => {
	return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date(new Date().toISOString())).toUpperCase();
};
</script>

<template>
	<div class="flex column wrap items-center justify-center" :class="$style.errorBox">
		<WarningIcon />
		<p class="q-pt-sm text-weight-medium text-body1">{{ props.msg }}</p>
		<p class="q-pt-xs q-pb-md text-body2">
			<span>Today at</span>&nbsp;
			<span>{{ date() }}</span>
		</p>
		<pre v-if="props.error && isDev">{{ props.error }}</pre>
		<slot></slot>
	</div>
</template>

<style lang="scss" module>
.errorBox {
	color: #ddd8d8;

	svg {
		font-size: 4.5rem;
	}

	span {
		&:first-child {
			color: #999999;
		}

		&:last-child {
			color: #d1caff;
		}
	}
}
</style>
