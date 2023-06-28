<script setup lang="ts">
import { fasHashtag } from '@quasar/extras/fontawesome-v5';
import { getPopularTags } from '~/services';

const { data, error } = await getPopularTags();
</script>

<template>
	<aside :class="$style.aside">
		<section :class="$style.popularTags">
			<h6 class="q-pb-md flex row no-wrap justify-between items-center">
				<span class="shrink">Popular Tags</span>
				<MedalIcon />
			</h6>

			<div v-if="data && data.tags" class="flex row wrap q-gutter-sm">
				<q-btn
					v-for="(item, index) in data.tags"
					:key="index"
					rounded
					no-caps
					unelevated
					size="md"
					color="dark"
					text-color="white"
					:label="item"
					:icon="fasHashtag"
					class="text-weight-regular"
					:to="`/?tag=${item}`"
				/>
			</div>

			<ErrorBox v-else :error="error" :msg="error?.message" />
		</section>
	</aside>
</template>

<style lang="scss" module>
.aside {
	& > section {
		background-color: #33394f;
		padding: 1rem;
		border-radius: 10px;
	} // & > section
} // .aside
.popularTags {
	:global {
		.q-icon {
			font-size: 0.85rem;
			margin-right: 6px;
		} // .q-icon
	} // :global
} // .popularTags
</style>
