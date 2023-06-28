<script setup lang="ts">
import { ref } from '#imports';
import { useNotify } from '~/composables';
import { DEBOUNCE_INPUT_TIME, ERROR_SEPARATOR } from '~/constants';
import { createNewComments } from '~/services';
import { authState } from '~/store';
import { Comment } from '~/types';

const props = defineProps<{ slug: string }>();
const auth = authState();
const commentBody = ref('');
const isLoading = ref(false);

const emit = defineEmits<{
	(e: 'onAfterCreate', data: Comment): void;
}>();

const handleSubmitForm = () => {
	isLoading.value = true;

	return createNewComments(props.slug, commentBody.value)
		.then((res) => {
			const data = res.data.value;
			const error = res.error.value;

			if (data) {
				useNotify({
					message: 'Your comment has been successfully deleted',
					type: 'success',
				});

				commentBody.value = '';
				emit('onAfterCreate', data.comment);
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
	<q-form v-if="auth.get.value" :class="$style.addComments" autocomplete="off">
		<q-input
			v-model="commentBody"
			filled
			class="text-body1"
			type="textarea"
			placeholder="Write a comment ..."
			label=""
			name="comment"
			lazy-rules
			:rules="[
				(val) => val.length > 0 || 'Please enter your comment',
				(val) => val.length >= 5 || 'More than 5 characters are required in the comment',
			]"
			no-error-icon
			:debounce="DEBOUNCE_INPUT_TIME"
			:disable="isLoading"
		>
			<template #label>
				<div class="flex row items-center justify-start">
					<q-avatar size="38px">
						<q-img
							:src="auth.get.value.image"
							:ratio="1"
							width="38"
							height="38"
							:alt="auth.get.value.username"
							placeholder-src="/no-image.jpeg"
						/>
					</q-avatar>
					<p class="q-pl-sm text-white text-body1 text-weight-medium">{{ auth.get.value.username }}</p>
				</div>
			</template>
			<template #after>
				<q-btn label="Post Comment" no-caps type="button" :loading="isLoading" @click="handleSubmitForm" />
			</template>
		</q-input>
	</q-form>

	<p v-else><NuxtLink to="/auth">Sign in or sign up</NuxtLink> to add comments on this article.</p>
</template>

<style lang="scss" module>
.addComments {
	:global {
		.q-field {
			padding: 1rem;
			background-color: #33394f;
			border-radius: 8px;
			cursor: text;
			transition: background-color 0.2s ease-in-out;
			display: flex;
			flex-direction: column;

			&.q-field--highlighted {
				background-color: #3f455dd2;

				.q-field__control {
					&,
					&:hover,
					&:focus {
						background: transparent !important;
					}
				}
			} // &.q-field--highlighted

			textarea {
				line-height: 1.65rem;
				height: 75px;
				min-height: 75px !important;
				padding: 0;

				&::placeholder {
					color: #fff !important;
				}
			}
		} // .q-field

		.q-field__control {
			padding: 0;
			border-radius: 0;

			&::before,
			&::after {
				display: none;
			}

			&,
			&:hover,
			&:focus {
				background: transparent !important;
			}
		} // .q-field__control

		.q-field__label {
			position: static;
			transform: none;
			top: 0;
			padding-bottom: 8px;
		}

		.q-field__control-container {
			display: flex;
			flex-direction: column-reverse;
			padding: 0 !important;
		}

		.q-field__after {
			align-self: flex-end;
			padding-top: 1rem;
		}

		.q-btn {
			background-color: #d1caff;
			color: #252d3a;
		}

		.q-avatar {
			border-radius: 5px;

			.q-icon {
				width: 100%;
				height: 100%;
				background-color: #9ab78d;
			}
		} // .q-avatar

		.q-field__bottom {
			padding-left: 0;
		}
	} // :global
} // .addComments
</style>
