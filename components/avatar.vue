<template>
	<div class="avatar-wrapper flex row items-center justify-start" :class="$style.avatarWrapper">
		<q-avatar icon="img:/sample/demo-avatar.png" size="44px" />

		<p class="q-pl-sm">
			<span class="block text-weight-medium">
				<NuxtLink to="/" class="text-white text-body2">Ebayyou</NuxtLink>
			</span>
			<span class="block date text-caption">6h ago</span>
		</p>
	</div>
</template>

<style lang="scss" module>
.avatarWrapper {
	:global {
		.q-avatar {
			border-radius: 5px;

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
