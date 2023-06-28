<script setup lang="ts">
import { computed } from '#imports';

const props = defineProps<{ avatarSrc: string; username: string; date: string }>();

const formatedDate = computed(() => {
	const date = new Date(props.date);
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
});
</script>

<template>
	<div class="avatar-wrapper flex row items-center justify-start" :class="$style.avatarWrapper">
		<q-avatar size="44px">
			<q-img :src="props.avatarSrc" :ratio="1" width="44" height="44" :alt="props.username" placeholder-src="/no-image.jpeg" />
		</q-avatar>

		<p class="q-pl-sm">
			<span class="block text-weight-medium">
				<NuxtLink :to="`/@${props.username}`" class="text-white text-body2">{{ props.username }}</NuxtLink>
			</span>
			<time class="block date text-caption" :datetime="props.date">{{ formatedDate }}</time>
		</p>
	</div>
</template>

<style lang="scss" module>
.avatarWrapper {
	:global {
		.q-avatar {
			border-radius: 50%;

			.q-icon {
				width: 100%;
				height: 100%;
				background-color: #9ab78d;
			}
		} // .q-avatar

		.date {
			color: #8d8080;
		}
	} // :global
} // .avatarWrapper
</style>
