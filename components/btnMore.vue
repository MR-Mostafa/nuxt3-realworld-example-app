<script setup lang="ts">
const props = defineProps<{ href: string }>();
</script>

<template>
	<q-btn flat unelevated rounded label="Read more..." :to="props.href" class="btn-more" :class="$style.btnMore" />
</template>

<style lang="scss" module>
.btnMore {
	background-color: #d9d9d9;
	color: #33394f;
}
</style>
