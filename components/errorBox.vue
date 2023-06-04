<script setup lang="ts">
const date = () => {
	return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date(new Date().toISOString())).toUpperCase();
};
</script>

<template>
	<div class="flex column wrap items-center justify-center q-py-xl" :class="$style.errorBox">
		<WarningIcon />
		<p class="q-pt-sm text-weight-medium text-body1">Something Went Wrong</p>
		<p class="q-pt-xs text-body2">
			<span>Today at</span>&nbsp;
			<span>{{ date() }}</span>
		</p>
	</div>
</template>

<style lang="scss" module>
.errorBox {
	color: #ddd8d8;

	svg {
		font-size: 4rem;
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
