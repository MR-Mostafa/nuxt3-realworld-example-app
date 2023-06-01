<script setup lang="ts">
import { farHeart } from '@quasar/extras/fontawesome-v5';
</script>

<template>
	<q-btn :icon="farHeart" label="320" :class="$style.btnLike" />
</template>

<style lang="scss" module>
.btnLike {
	background-color: #d1caff;
	color: #252d3a;
}

.activeLike {
	background-color: #fc728b;
	color: #fff;
} // .activeLike
</style>
