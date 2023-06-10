<script setup lang="ts">
import { useState } from '#imports';
import { farEdit } from '@quasar/extras/fontawesome-v5';

const feedTab = useState<'my-articles' | 'favorited-articles'>('feedTabs', () => 'my-articles');
</script>

<template>
	<header :class="$style.header" class="relative-position">
		<div class="btn-wrapper absolute">
			<q-btn :icon="farEdit" label="Edit Profile Settings" class="edit-btn" no-caps />
			<Follow class="q-ml-md" />
		</div>

		<p class="user-name text-h4 absolute absolute-center">User Name</p>
		<q-avatar icon="img:/sample/demo-avatar.png" size="120px" class="absolute absolute-left absolute-right" />
	</header>

	<div :class="$style.tabsWrapper">
		<q-tabs v-model="feedTab" no-caps>
			<q-tab name="my-articles" label="My Articles" />
			<q-tab name="favorited-articles" label="Favorited Articles" />
		</q-tabs>
		<q-tab-panels v-model="feedTab" animated>
			<q-tab-panel name="my-articles" class="my-articles">
				<ShortArticle />
				<ShortArticle />
			</q-tab-panel>

			<q-tab-panel name="favorited-articles" class="favorited-articles">
				<ShortArticle />
				<ShortArticle />
				<ShortArticle />
				<ShortArticle />
			</q-tab-panel>
		</q-tab-panels>
	</div>
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

			.q-icon {
				width: 100%;
				height: 100%;
				background: linear-gradient(86.55deg, rgba(65, 88, 208, 0.6) 0%, #c850c0 46.88%, #ffcc70 100%);
			}
		} // .q-avatar
	} // :global
} // .header

.tabsWrapper {
	:global {
		.q-tabs__content {
			border-bottom: 4px solid #33394f;
			justify-content: flex-start;
			margin-bottom: 1.5rem;
		} // .q-tabs__content

		.q-tab {
			min-height: 54px;
			padding: 0px 20px;

			& + .q-tab {
				margin-left: 0.25rem;
			}
		} // .q-tab

		.q-tab__content {
			padding: 1rem 0.5rem;
		}

		.q-tab__label {
			padding: 0.5rem;
		}

		.q-tab__indicator {
			background: #7b61ff;
			border-radius: 2px;
			height: 6px;
		} // .q-tab__indicator

		.q-tab-panels {
			background-color: transparent;
		}
		.q-tab-panel {
			padding: 0;
			padding-right: 13px;
		}
	} // :global
} // .tabsWrapper
</style>
