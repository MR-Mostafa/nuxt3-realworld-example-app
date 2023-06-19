<script setup lang="ts">
import { computed, definePageMeta, navigateTo, ref } from '#imports';
import { useAPI, useNotify } from '~/composables';
import { DEBOUNCE_INPUT_TIME, EMAIL_REGEX, ERROR_SEPARATOR } from '~/constants';
import { authState } from '~/store';
import { RegisterLogin, User, UserLogin } from '~/types';

definePageMeta({
	middleware: ['redirect-to-profile'],
});

const auth = authState();
const loginData = ref<UserLogin>({ email: '', password: '' });
const registerData = ref<RegisterLogin>({ username: '', email: '', password: '' });
const isLoading = ref(false);

const isActiveForm = computed(() => {
	return (obj: Record<string, string>) => {
		return Object.entries(obj).some(([_key, value]) => {
			return value.length > 0;
		});
	};
});

const handleSubmitForm = async (obj: Record<string, string>) => {
	const hasEmptyInput = Object.entries(obj).some(([_key, value]) => {
		return value.length === 0;
	});

	if (hasEmptyInput) return;

	const url = isActiveForm.value(loginData.value) ? '/users/login' : '/users';

	isLoading.value = true;

	return await useAPI<User>(url, { method: 'POST', body: { user: obj }, timeout: 7000 })
		.then(async (res) => {
			const data = res.data.value;
			const error = res.error.value;

			if (data && data.user) {
				auth.set(data);

				useNotify({
					message: `${isActiveForm.value(loginData.value) ? 'Login' : 'Registration'} has been successful`,
					type: 'success',
				});

				await navigateTo(`/@${data.user.username}`);
			}

			if (error && error.message) {
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
	<Head>
		<Title>Auth Page</Title>
	</Head>

	<div class="flex row justify-between items-start q-col-gutter-x-lg" :class="$style.authPage">
		<!--
			Login Form
		-->
		<q-form id="login" class="col-6 q-gutter-lg q-pr-xl" autocomplete="off" @submit.prevent="handleSubmitForm(loginData)">
			<h3 class="text-weight-medium text-h4">Login</h3>
			<q-input
				v-model="loginData.email"
				standout
				name="email"
				type="text"
				inputmode="email"
				label="Email"
				placeholder="Enter Your Email Address"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please enter your email address',
					(val) => EMAIL_REGEX.test(val) || 'Please enter a valid email address',
				]"
				no-error-icon
				:debounce="DEBOUNCE_INPUT_TIME"
				:disable="isActiveForm(registerData) || isLoading"
			/>

			<q-input
				v-model="loginData.password"
				standout
				name="password"
				type="password"
				inputmode="text"
				label="Password"
				placeholder="Enter Your password"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please enter your password']"
				no-error-icon
				:debounce="DEBOUNCE_INPUT_TIME"
				:disable="isActiveForm(registerData) || isLoading"
			/>
		</q-form>

		<!--
			Register Form
		-->
		<q-form id="register" class="col-6 q-gutter-lg q-pl-xl" autocomplete="off" @submit.prevent="handleSubmitForm(registerData)">
			<h3 class="text-weight-medium text-h4">Register</h3>
			<q-input
				v-model="registerData.username"
				standout
				name="username"
				type="text"
				inputmode="text"
				label="User Name"
				placeholder="Enter Your User Name"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please enter your username',
					(val) => (val && val.length >= 5) || 'More than 5 characters are required in the username',
				]"
				no-error-icon
				:debounce="DEBOUNCE_INPUT_TIME"
				:disable="isActiveForm(loginData) || isLoading"
			/>

			<q-input
				v-model="registerData.email"
				standout
				name="email"
				type="text"
				inputmode="email"
				label="Email"
				placeholder="Enter Your Email Address"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please enter your email address',
					(val) => EMAIL_REGEX.test(val) || 'Please enter a valid email address',
				]"
				no-error-icon
				:debounce="DEBOUNCE_INPUT_TIME"
				:disable="isActiveForm(loginData) || isLoading"
			/>

			<q-input
				v-model="registerData.password"
				standout
				name="password"
				type="password"
				inputmode="text"
				label="Password"
				placeholder="Enter Your password"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please enter your password',
					(val) => (val && val.length >= 5) || 'More than 5 characters are required in the password',
				]"
				no-error-icon
				:debounce="DEBOUNCE_INPUT_TIME"
				:disable="isActiveForm(loginData) || isLoading"
			/>
		</q-form>
	</div>

	<!--
		Submit Form
	-->
	<div class="q-pt-xl text-center">
		<q-btn
			no-caps
			:label="isActiveForm(loginData) ? 'Login' : isActiveForm(registerData) ? 'Register' : 'Login/Register'"
			type="submit"
			size="lg"
			class="login-register full-width"
			:class="$style.loginRegisterBtn"
			:form="isActiveForm(loginData) ? 'login' : 'register'"
			:disable="(!isActiveForm(loginData) && !isActiveForm(registerData)) || isLoading"
			:loading="isLoading"
		/>
	</div>
</template>

<style lang="scss" module>
.authPage {
	position: relative;

	&::after,
	&::before {
		display: block;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	&:before {
		content: '';
		width: 1px;
		height: 100%;
		background-color: #33394f;
	}

	&:after {
		content: 'OR';
		width: 30px;
		height: 40px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: var(--q-dark-page);
	}
} // .authPage

.loginRegisterBtn {
	background-color: #a296bd;
	color: #202433;
	max-width: 700px;
	border-radius: 6px;
	padding: 18px;
} // .login-register
</style>
