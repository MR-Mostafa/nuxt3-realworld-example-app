import { type UseFetchOptions } from '#app';
import { createError, useFetch, useRuntimeConfig } from '#imports';
import { defu } from 'defu';
import { useToken } from '~/composables';
import { ONE_WEEK } from '~/constants';

interface ErrorType {
	errors: Record<string, string[]>;
}

export function useAPI<T = unknown>(url: string | (() => string), userOptions: UseFetchOptions<T> = {}) {
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
				options.headers = {
					...options.headers,
					'Authorization': getToken,
					'Accept': 'application/json',
					'Content-type': 'application/json',
				};
			}
		},

		onResponse({ response }) {
			const token = response._data?.user?.token;

			if (token) {
				userToken.set(token);
			}
		},

		onResponseError({ response }) {
			const statusCode = response.status || 500;
			const statusMessage = response.statusText || '';
			const errorsMsg = (response._data || {}) as ErrorType;

			const errorEntries = Object.entries(errorsMsg.errors);

			const message = errorEntries.reduce((acc: string[], [key, value]) => {
				return [...acc, ...value.map((item) => `${key} ${item}`)];
			}, []);

			throw createError({ statusCode, statusMessage, message: JSON.stringify(message) });
		},
	};

	const options = defu(userOptions, defaultOptions) as UseFetchOptions<T>;

	return useFetch(url, options);
}
