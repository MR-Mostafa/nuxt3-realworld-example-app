<script setup lang="ts">
import { computed, ref } from '#imports';
import { farUser } from '@quasar/extras/fontawesome-v5';
import { useNotify } from '~/composables';
import { addFollowUser, removeUnFollowUser } from '~/services';

const props = defineProps<{ userName: string; isFollow: boolean }>();
const isFollow = ref(props.isFollow);
const isLoading = ref(false);

const handleFollowUser = computed(() => {
	return () => {
		const fetchApi = isFollow.value ? removeUnFollowUser(props.userName) : addFollowUser(props.userName);

		isLoading.value = true;

		return fetchApi
			.then((res) => {
				const data = res.data.value;
				const error = res.error.value;

				if (data) {
					isFollow.value = data.profile.following;
				}

				if (error) {
					useNotify({
						message: error.message || 'something went wrong, please try again',
						type: 'error',
					});
				}
			})
			.finally(() => {
				isLoading.value = false;
			});
	};
});
</script>

<template>
	<q-btn
		:icon="farUser"
		:label="`${isFollow ? 'UnFollow' : 'Follow'} ${props.userName}`"
		:class="[$style.followBtn, { [$style.activeFollow]: isFollow }]"
		no-caps
		:loading="isLoading"
		@click="handleFollowUser"
	/>
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
