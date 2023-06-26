import { createError } from '#imports';
import { useAPI } from '~/composables';
import { Profile, UpdateUserData, User } from '~/types';

/**
 * @description
 * Retrieves a user's profile information from and throws an error if the username does not exist.
 */
export const getUserProfileData = (useName: string) => {
	return useAPI<Profile>(`/profiles/${useName}`)
		.then((res) => {
			const error = res.error.value;

			if (error) {
				throw createError({ statusCode: 404, message: 'This username does not exist.' });
			}

			return res;
		})
		.catch(() => {
			throw createError({ statusCode: 404, message: 'This username does not exist.' });
		});
};

/**
 * @description
 * adds a user to the list of followed users.
 */
export const addFollowUser = (useName: string) => {
	return useAPI<Profile>(`/profiles/${useName}/follow`, { method: 'POST' });
};

/**
 * @description
 * removes a user from the list of followed users.
 */
export const removeUnFollowUser = (useName: string) => {
	return useAPI<Profile>(`/profiles/${useName}/follow`, { method: 'DELETE' });
};

export const updateUserData = (newValues: UpdateUserData) => {
	return useAPI<User>('/user', { method: 'PUT', body: { user: newValues } });
};
