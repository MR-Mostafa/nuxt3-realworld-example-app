<script setup lang="ts">
import { computed, useRoute, useState } from '#imports';
import { farEdit } from '@quasar/extras/fontawesome-v5';
import { LocationQueryValue, RouteLocationRaw } from '~/.nuxt/vue-router';
import { PAGE_SIZE_LIMIT } from '~/constants';
import { getAllArticles, getUserProfileData } from '~/services';
import { authState } from '~/store';
import { capitalizeWord } from '~/utils';

const auth = authState();
const route = useRoute();

const routeName = computed(() => {
	return route.params.userName as string;
});

const myArticlesQueries = computed(() => {
	const query = route.query as Record<string, LocationQueryValue>;

	const author = routeName.value;
	const limit = parseInt(query.limit || PAGE_SIZE_LIMIT, 10);
	const page = (parseInt(query.page || '1', 10) - 1) * limit;

	return {
		author,
		limit,
		offset: page,
	};
});

const { data: userData } = await getUserProfileData(routeName.value);

const userProfileTab = useState<'articles' | 'favorited'>('userProfileTab', () => 'articles');

const { data: myArticlesData, error: myArticlesError, pending: myArticlesPending } = await getAllArticles(myArticlesQueries);

const createPageLink = (page: number): RouteLocationRaw => {
	const pastQuery = route.query;

	return { query: { ...pastQuery, page } };
};
</script>

<template>
	<template v-if="userData?.profile">
		<header :class="$style.header" class="relative-position">
			<div class="btn-wrapper absolute">
				<q-btn
					v-if="auth.get.value && auth.get.value.username === userData.profile.username"
					:icon="farEdit"
					label="Edit Profile Settings"
					class="edit-btn"
					no-caps
					to="/profile/settings"
				/>

				<Follow
					v-if="auth.get.value?.username !== userData.profile.username"
					:user-name="userData.profile.username"
					:is-follow="userData.profile.following"
				/>
			</div>

			<p class="user-name text-h4 absolute absolute-center">{{ capitalizeWord(userData.profile.username) }}</p>
			<q-avatar size="120px" class="absolute absolute-left absolute-right">
				<q-img
					:src="userData.profile.image"
					:ratio="1"
					width="120"
					height="120"
					:alt="userData.profile.username"
					placeholder-src="/no-image.jpeg"
				/>
			</q-avatar>
		</header>

		<div :class="$style.tabsWrapper">
			<q-tabs v-model="userProfileTab" no-caps>
				<q-route-tab name="articles" label="My Articles" :to="`/@${routeName}`" />
				<q-route-tab name="favorited" label="Favorited Articles" :to="`/@${routeName}/favorited`" />
			</q-tabs>

			<ShortArticlesSection
				:data="myArticlesData"
				:pending="myArticlesPending"
				:error="myArticlesError"
				:handle-create-page-link="createPageLink"
			/>
		</div>
	</template>
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
	} // :global
} // .tabsWrapper
</style>
