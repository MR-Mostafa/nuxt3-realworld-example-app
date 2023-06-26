<script setup lang="ts">
import { authState } from '~/store';

const auth = authState();
</script>

<template>
	<ClientOnly>
		<header :class="$style.header" class="relative-position">
			<p class="user-name text-h4 absolute absolute-center">Your Settings</p>

			<q-avatar size="120px" class="absolute absolute-left absolute-right">
				<q-img
					:src="auth.get.value!.image"
					:ratio="1"
					width="120"
					height="120"
					:alt="auth.get.value!.username"
					placeholder-src="/no-image.jpeg"
				/>
			</q-avatar>
		</header>
		<ChangeSettings />
	</ClientOnly>
</template>

<style lang="scss" module>
.header {
	$bottom: 60px;

	background: linear-gradient(86.55deg, rgba(65, 88, 208, 0.6) 0%, #c850c0 46.88%, #ffcc70 100%);
	border-radius: 5px;
	height: 200px;
	margin-bottom: $bottom + 30px;

	:global {
		.btn-wrapper {
			top: auto;
			bottom: 1rem;
			left: 1rem;

			.edit-btn {
				background-color: #d1caff;
				color: #252d3a;
			}
		} // .btn-wrapper

		.user-name {
			padding-bottom: $bottom / 2;
			opacity: 0.7;
			text-shadow: 1px 1px 5px #00000066;
		}
		.q-avatar {
			top: auto;
			bottom: $bottom * -1;
			border-radius: 5px;
			width: 120px;
			height: 120px;
			margin: 0 auto;
			display: block;

			.q-img__image {
				border-radius: 50%;
			}
		} // .q-avatar
	} // :global
} // .header
</style>
