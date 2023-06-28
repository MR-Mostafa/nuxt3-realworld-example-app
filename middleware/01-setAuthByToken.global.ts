import { defineNuxtRouteMiddleware } from '#imports';
import { useAPI, useToken } from '~/composables';
import { authState } from '~/store';
import { User } from '~/types';

export default defineNuxtRouteMiddleware(async () => {
	const token = useToken();

	if (!token) return;

	const auth = authState();

	if (auth.get.value) return;

	const { data } = await useAPI<User>('/user', { timeout: 4000 });

	auth.set(data.value || undefined);
});
