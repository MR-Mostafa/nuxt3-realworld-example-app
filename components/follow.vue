<script setup lang="ts">
import { farUser } from '@quasar/extras/fontawesome-v5';
</script>

<template>
	<q-btn :icon="farUser" label="Follow User Name" :class="[$style.followBtn, $style.activeFollow]" no-caps />
</template>

<style lang="scss" module>
.followBtn {
	background-color: #d1caff;
	color: #252d3a;
}

.activeFollow {
	background-color: #9ab78d;
	color: #202433;
} // .activeFollow
</style>
