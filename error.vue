<script setup lang="ts">
defineProps<{ error: unknown }>();
</script>

<template>
	<p>Error Page</p>
	<p>{{ error }}</p>
</template>
