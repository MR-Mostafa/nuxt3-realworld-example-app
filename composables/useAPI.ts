import { defu } from 'defu';
import { useFetch, useRuntimeConfig, type AsyncData, type UseFetchOptions } from 'nuxt/app';
import { useToken } from '~/composables/useToken';
import { ONE_WEEK } from '~/constants';

interface ErrorType {
	errors: {
		body: string[];
	};
}

export function useAPI<T = unknown, E = ErrorType>(url: string | (() => string), userOptions: UseFetchOptions<T> = {}) {
	const expireDate = new Date(Date.now() + ONE_WEEK);
	const config = useRuntimeConfig();
	const userToken = useToken({ expires: expireDate });

	const defaultOptions: UseFetchOptions<T> = {
		baseURL: config.public.baseUrl,
		method: 'GET',
		retry: 3,

		// cache request
		key: typeof url === 'string' ? url : url(),

		onRequest({ options }) {
			const getToken = userToken.get();

			if (getToken) {
				options.headers = { ...options.headers, Authorization: getToken };
			}
		},

		onResponse({ response }) {
			const token = response._data?.user?.token;

			if (token) {
				userToken.set(token);
			}
		},
	};

	const options = defu(userOptions, defaultOptions) as UseFetchOptions<T>;

	return useFetch(url, options) as AsyncData<T, E>;
}
