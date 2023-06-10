import { defineNuxtRouteMiddleware } from '#imports';
import { useToken } from '~/composables';

export default defineNuxtRouteMiddleware(() => {
	const token = useToken();

	if (!token) return '';
});
