<script setup lang="ts">
const props = withDefaults(defineProps<{ msg?: string }>(), { msg: 'Something Went Wrong' });

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
