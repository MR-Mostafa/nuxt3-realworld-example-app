import { computed, useState } from '#imports';
import { SimpleFlatten, User } from '~/types';

export const authState = () => {
	const state = useState<SimpleFlatten<User> | undefined>('userData', () => undefined);

	const get = computed(() => state.value);

	const set = (newValue?: User) => {
		state.value = newValue?.user;
	};

	return { get, set };
};
