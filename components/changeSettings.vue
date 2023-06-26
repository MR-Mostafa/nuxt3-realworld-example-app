<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<script setup lang="ts">
import { ref } from '#imports';
import { useNotify } from '~/composables';
import { DEBOUNCE_INPUT_TIME, EMAIL_REGEX, ERROR_SEPARATOR, URL_REGEX } from '~/constants';
import { updateUserData } from '~/services';

import { authState } from '~/store';
import { UpdateUserData } from '~/types';

const auth = authState();

const userData = ref<UpdateUserData>({
	email: auth.get.value!.email,
	username: auth.get.value!.username,
	bio: auth.get.value?.bio,
	image: auth.get.value?.image,
	password: undefined,
});

const isLoading = ref(false);

const handleSubmitForm = () => {
	isLoading.value = true;

	return updateUserData(userData.value)
		.then((res) => {
			const data = res.data.value;
			const error = res.error.value;

			if (data) {
				useNotify({
					message: 'User information has been successfully updated',
					type: 'success',
				});

				auth.set(data);
			}

			if (error) {
				useNotify({
					message: error.message.split(ERROR_SEPARATOR).join('<br />'),
					type: 'error',
				});
			}

			return res;
		})
		.catch((err) => {
			useNotify({
				message: 'An error has occurred, please check them again.',
				type: 'error',
			});

			console.error(err);
		})
		.finally(() => {
			isLoading.value = false;
		});
};
</script>

<template>
	<q-form :class="$style.changeSettings" class="row q-col-gutter-lg" autocomplete="off" @submit.prevent="handleSubmitForm">
		<q-input
			v-model="userData.image"
			filled
			class="text-body1 col-12"
			type="url"
			inputmode="url"
			label="URL of profile picture"
			name="image"
			lazy-rules
			:rules="[(val) => val.length === 0 || URL_REGEX.test(val) || 'Please enter a valid image url']"
			no-error-icon
			:debounce="DEBOUNCE_INPUT_TIME"
			:disable="isLoading"
		>
			<template #append>
				<q-img :src="userData.image" :ratio="1" width="36" height="36" :alt="auth.get.value!.username" placeholder-src="/no-image.jpeg" />
			</template>
		</q-input>

		<q-input
			v-model="userData.bio"
			filled
			class="text-body1 col-6"
			type="textarea"
			inputmode="text"
			label="Short bio about you"
			name="bio"
			:disable="isLoading"
		/>

		<div class="col-6 column q-col-gutter-y-lg">
			<q-input
				v-model="userData.username"
				filled
				class="text-body1"
				type="text"
				inputmode="text"
				label="Username"
				name="username"
				:disable="isLoading"
			/>

			<q-input
				v-model="userData.email"
				filled
				class="text-body1"
				type="email"
				inputmode="email"
				label="Email"
				name="email"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please enter your email address',
					(val) => EMAIL_REGEX.test(val) || 'Please enter a valid email address',
				]"
				no-error-icon
				:debounce="DEBOUNCE_INPUT_TIME"
				:disable="isLoading"
			/>

			<q-input
				v-model="userData.password"
				filled
				class="text-body1"
				type="text"
				inputmode="text"
				label="New Password"
				name="password"
				:disable="isLoading"
			/>
		</div>

		<div class="col-12">
			<q-btn
				label="Update Settings"
				class="full-width"
				size="21.8px"
				no-caps
				type="submit"
				:loading="isLoading"
				:disable="userData.username.length === 0 || userData.email.length === 0"
			/>
		</div>
	</q-form>
</template>

<style lang="scss" module>
.changeSettings {
	:global {
		.q-field {
			textarea {
				line-height: 1.65rem;
				height: 188px;
				min-height: 188px !important;
				padding: 0;
				resize: none !important;
			}
		} // .q-field

		.q-btn {
			background-color: #d1caff;
			color: #202433;
		} // .q-btn

		.q-field__append {
			.q-img {
				width: 34px;
				height: 34px;
			} // .q-img

			.q-img__image {
				border-radius: 50%;
			} // .q-img__image
		} // .q-field__append
	} // :global
} // .changeSettings
</style>
