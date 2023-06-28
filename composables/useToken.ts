import { type CookieOptions } from '#app';
import { useCookie, useRuntimeConfig } from '#imports';

export const useToken = <T = string | null | undefined>(options: CookieOptions<T> = {}) => {
	const config = useRuntimeConfig();
	const token = useCookie(config.public.cookieName, options);

	const get = () => {
		return `Token ${token.value}`;
	};

	const set = (value: T) => {
		token.value = value;
	};

	const hasToken = () => {
		return !!token.value;
	};

	return { get, set, hasToken };
};
