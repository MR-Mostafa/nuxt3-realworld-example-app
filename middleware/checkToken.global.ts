import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useAPI, useToken } from '~/composables';
import { authState } from '~/store';
import { User } from '~/types';

export default defineNuxtRouteMiddleware(async () => {
	const token = useToken();

	if (!token) return;

	const { data } = await useAPI<User>('/user');
	const auth = authState();

	auth.set(data.value || undefined);
});
