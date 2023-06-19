<script setup lang="ts">
import { navigateTo } from '#app';
import { ref } from '#imports';
import { fasEdit, fasRssSquare, fasSignOutAlt, fasUser, fasUserEdit } from '@quasar/extras/fontawesome-v5';
import { useToken } from '~/composables';
import { authState } from '~/store/auth';

const auth = authState();
const userToken = useToken();
const isShowDropdown = ref(false);

const handleIsShownDropdown = () => {
	isShowDropdown.value = !isShowDropdown.value;
};

const handleSignOut = async () => {
	userToken.set(undefined);
	auth.set(undefined);
	await navigateTo('/auth');
};
</script>

<template>
	<q-btn-dropdown
		v-if="auth.get.value"
		flat
		rounded
		auto-close
		class="user-btn"
		:content-class="$style.dropdownMenu"
		@before-show="handleIsShownDropdown()"
		@hide="handleIsShownDropdown()"
	>
		<template #label>
			<q-avatar :class="{ 'q-pa-none': auth.get.value }">
				<img :src="auth.get.value.image" :title="auth.get.value.username" :alt="auth.get.value.username" width="32" height="32" />
				<q-tooltip :class="{ [$style.hideTooltip]: isShowDropdown }" anchor="bottom middle" self="center middle" :offset="[22, 22]">{{
					auth.get.value.username
				}}</q-tooltip>
			</q-avatar>
		</template>

		<q-list class="rounded-borders">
			<q-item v-ripple clickable :to="`/@${auth.get.value.username}`">
				<q-item-section avatar><q-icon :name="fasUser" size="18px" /></q-item-section>
				<q-item-section>My Profile</q-item-section>
			</q-item>

			<q-item v-ripple clickable to="/profile/feed">
				<q-item-section avatar><q-icon :name="fasRssSquare" size="18px" /></q-item-section>
				<q-item-section>My Feed</q-item-section>
			</q-item>

			<q-item v-ripple clickable to="/profile/settings">
				<q-item-section avatar><q-icon :name="fasUserEdit" size="22px" /></q-item-section>

				<q-item-section>Settings</q-item-section>
			</q-item>

			<q-item v-ripple clickable to="/article/add">
				<q-item-section avatar><q-icon :name="fasEdit" size="20px" /></q-item-section>
				<q-item-section>New Article</q-item-section>
			</q-item>

			<q-item v-ripple clickable @click="handleSignOut">
				<q-item-section avatar><q-icon :name="fasSignOutAlt" size="20px" /></q-item-section>
				<q-item-section>Log Out</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>

	<q-btn v-else flat rounded class="user-btn" to="/auth">
		<UserIcon />
	</q-btn>
</template>

<style lang="scss" module>
.dropdownMenu {
	background-color: #33394f;
	border-radius: 5px;
	box-shadow: 0 0px 4px 1px #33394fbf;
	border: none;

	:global {
		.q-list {
			min-width: 170px;
			border: none;
			padding: 6px 0;
		} // .q-list

		.q-item__section--avatar {
			min-width: auto;
			padding-right: 7px;
		} // .q-item__section--avatar

		.q-router-link--active {
			color: #fff;
			background-color: rgb(62 68 88);
			pointer-events: none;
		} // .q-router-link--active
	} // :global
} // .dropdownMenu

.hideTooltip {
	display: none;
}
</style>
