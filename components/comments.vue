<script setup lang="ts">
import { ref } from '#imports';
import { fasTrashAlt } from '@quasar/extras/fontawesome-v5';
import { useNotify } from '~/composables';
import { ERROR_SEPARATOR } from '~/constants';
import { deleteCommetById } from '~/services';
import { authState } from '~/store';
import { Comment } from '~/types';

const props = defineProps<{
	comment: Comment;
	slug: string;
}>();

const emit = defineEmits<{
	(e: 'onAfterDelete', id: number): void;
}>();

const auth = authState();
const isLoading = ref(false);

const handleDeleteComment = () => {
	isLoading.value = true;

	return deleteCommetById(props.slug, props.comment.id)
		.then((res) => {
			const data = res.data.value;
			const error = res.error.value;

			if (data) {
				useNotify({
					message: 'Your comment has been successfully deleted',
					type: 'success',
				});

				emit('onAfterDelete', props.comment.id);
			}

			if (error) {
				useNotify({
					message: error.message.split(ERROR_SEPARATOR).join('<br />'),
					type: 'error',
				});
			}

			return res;
		})
		.catch((err) => {
			useNotify({
				message: 'An error has occurred, please check them again.',
				type: 'error',
			});

			console.error(err);
		})
		.finally(() => {
			isLoading.value = false;
		});
};
</script>

<template>
	<div :class="$style.comments">
		<div class="flex row items-center justify-between">
			<Avatar :avatar-src="props.comment.author.image" :date="props.comment.createdAt" :username="props.comment.author.username" />

			<q-btn
				v-if="auth.get.value && auth.get.value.username === props.comment.author.username"
				dense
				rounded
				unelevated
				text-color="white"
				:icon="fasTrashAlt"
				:loading="isLoading"
				@click="handleDeleteComment"
			/>
		</div>

		<p class="text-body1 text-weight-light q-pt-sm">{{ props.comment.body }}</p>
	</div>
</template>

<style lang="scss" module>
.comments {
	margin-top: 1.75rem;

	& + .comments {
		padding-top: 1.75rem;
		border-top: 2px dashed #343a5096;
	}

	:global {
		.q-btn {
			width: 40px;
			height: 40px;
		}
		.q-icon {
			font-size: 1.1rem;
		} // .q-icon
	} // :global
} // .comments
</style>
