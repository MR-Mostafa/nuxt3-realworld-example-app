import { type UseFetchOptions } from '#app';
import { createError, useFetch, useRuntimeConfig } from '#imports';
import { defu } from 'defu';
import { useToken } from '~/composables';
import { ERROR_SEPARATOR, ONE_WEEK } from '~/constants';

interface ErrorType {
	errors: Record<string, string[]>;
}

type FetchOptions<T> = UseFetchOptions<T> & { timeout?: number };

export function useAPI<T = unknown>(url: string | (() => string), userOptions: FetchOptions<T> = {}) {
	const expireDate = new Date(Date.now() + ONE_WEEK);
	const config = useRuntimeConfig();
	const userToken = useToken({ expires: expireDate });

	/**
	 * Aborting a fetch with timeout
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal#aborting_a_fetch_with_timeout_or_explicit_abort|Aborting a fetch}
	 */
	const controller = new AbortController();
	const timeoutId = setTimeout(() => {
		controller.abort(createError({ statusCode: 408, statusMessage: 'aborted', message: 'This request has been automatically aborted.' }));
	}, userOptions.timeout);

	const defaultOptions: FetchOptions<T> = {
		baseURL: `${config.public.baseUrl}`,
		method: 'GET',
		retry: 3,
		signal: userOptions.timeout ? controller.signal : undefined,

		// cache request
		key: typeof url === 'string' ? url : url(),

		onRequest({ options }) {
			const hasToken = userToken.hasToken();

			if (hasToken) {
				const getToken = userToken.get();
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
			const hasError = !response.status.toString().startsWith('2') || response._data.status === 'error';

			if (hasError) {
				throw createError({
					statusCode: response.status,
					statusMessage: response._data.status,
					message: response._data?.message || JSON.stringify(response._data?.errors),
				});
			}

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

			throw createError({ statusCode, statusMessage, message: message.join(ERROR_SEPARATOR) });
		},
	};

	const options = defu(userOptions, defaultOptions) as UseFetchOptions<T>;

	return useFetch(url, options).finally(() => {
		if (userOptions.timeout && timeoutId) {
			clearTimeout(timeoutId);
		}
	});
}
