<script setup lang="ts">
import { useState } from 'nuxt/app';

const feedTab = useState<'global' | 'local'>('feedTabs', () => 'global');
</script>

<template>
	<div class="flex row q-gutter-x-lg">
		<main class="col" :class="$style.main">
			<q-tabs v-model="feedTab" no-caps>
				<q-tab name="global" label="Global Feed" />
				<q-tab name="local" label="Your Feed" />
			</q-tabs>
			<q-tab-panels v-model="feedTab" animated>
				<q-tab-panel name="global" class="global-article">
					<ShortArticle />
					<ShortArticle />
					<ShortArticle />
					<ShortArticle />
					<ShortArticle />
					<ShortArticle />

					<div class="q-pt-lg">
						<Pagination />
					</div>
				</q-tab-panel>

				<q-tab-panel name="local" class="local-article">
					<p class="text-center text-h6 q-py-md text-weight-light">
						Please <NuxtLink to="/auth" class="text-white q-pb-sm">sign in</NuxtLink> if you have not already.
					</p>
				</q-tab-panel>
			</q-tab-panels>
		</main>

		<Aside class="col-4 q-pl-lg" />
	</div>
</template>

<style lang="scss" module>
.main {
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

		.local-article {
			a {
				border-bottom: 1px dashed #fff;

				&:hover,
				&:focus {
					opacity: 0.75;
				}
			}
		}
	} // :global
} // .main
</style>
