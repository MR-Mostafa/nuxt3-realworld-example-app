<script setup lang="ts">
import { useAPI } from '~/composables';
import { authState } from '~/store';
import { User } from '~/types';

const { data } = await useAPI<User>('/user');
const auth = authState();

auth.set(data.value || undefined);
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
