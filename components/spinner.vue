<script setup lang="ts">
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
	if (process.client) {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}
});
</script>

<template>
	<q-inner-loading :showing="true" label="Please wait..." :class="$style.spinner" transition-duration="0" />
</template>

<style lang="scss" module>
.spinner {
	padding: 2rem 0;
	position: static;
	background-color: transparent;
}
</style>
