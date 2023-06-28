import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { USERS_MUST_BE_LOGIN_IN_ROUTES } from '~/constants';
import { authState } from '~/store';

export default defineNuxtRouteMiddleware((to) => {
	const auth = authState();

	const isNeedLogin = USERS_MUST_BE_LOGIN_IN_ROUTES.some((item) => {
		return to.fullPath.includes(item);
	});

	if (!auth.get.value && isNeedLogin) {
		return navigateTo('/auth', { redirectCode: 401 });
	}
});
