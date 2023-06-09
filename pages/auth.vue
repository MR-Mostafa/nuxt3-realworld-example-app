<script setup lang="ts">
import { navigateTo } from '#app';
import { fasCheckSquare, fasExclamationTriangle } from '@quasar/extras/fontawesome-v5';
import { computed, onBeforeMount, ref } from 'vue';
import { useAPI, useNotify } from '~/composables';
import { DEBOUNCE_INPUT_TIME, EMAIL_REGEX } from '~/constants';
import { authState } from '~/store';
import { RegisterLogin, User, UserLogin } from '~/types';

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

onBeforeMount(() => {
	if (auth.get.value) {
		navigateTo(`/@${auth.get.value.username}`);
	}
});

const handleSubmitForm = async (obj: Record<string, string>) => {
	const hasEmptyInput = Object.entries(obj).some(([_key, value]) => {
		return value.length === 0;
	});

	if (hasEmptyInput) return;

	isLoading.value = true;

	const url = isActiveForm.value(loginData.value) ? '/users/login' : '/users';
	const errorMsg = 'There has been an error in the input forms, please check them again.';
	const successfulMsg = `${isActiveForm.value(loginData.value) ? 'Login' : 'Registration'} has been successful`;

	return await useAPI<User>(url, { method: 'POST', body: { user: obj } })
		.then((res) => {
			if (res.error.value) {
				useNotify({
					color: 'red-8',
					message: errorMsg,
					type: 'negative',
					icon: fasExclamationTriangle,
				});
			}

			if (res.data.value) {
				auth.set(res.data.value);
				useNotify({
					color: 'green-8',
					message: successfulMsg,
					type: 'positive',
					icon: fasCheckSquare,
				});
				navigateTo(`/@${res.data.value.user.username}`);
			}

			return res;
		})
		.catch(() => {
			useNotify({
				color: 'red-8',
				message: 'There has been an error in the input forms, please check them again.',
				type: 'negative',
				icon: fasExclamationTriangle,
			});
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
