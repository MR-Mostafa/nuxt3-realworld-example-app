import { defineNuxtRouteMiddleware } from '#app';
import { authState } from '~/store';

export default defineNuxtRouteMiddleware(() => {
	const userAuth = authState();

	if (userAuth.get.value) {
		return `/@${userAuth.get.value.username}`;
	}
});
