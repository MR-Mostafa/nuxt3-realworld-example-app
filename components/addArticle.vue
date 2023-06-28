<!-- eslint-disable vue/no-v-html -->

<script setup lang="ts">
import { computed, ref } from '#imports';
import { fasTimes } from '@quasar/extras/fontawesome-v5';
import { marked } from 'marked';
import { Ref } from 'nuxt/dist/app/compat/vue-demi';
import sanitizeHtml from 'sanitize-html';
import { ErrorValidation, NewArticle } from '~/types';
import { validator } from '~/utils';

const props = withDefaults(defineProps<Partial<NewArticle> & { loading: boolean }>(), {
	title: '',
	description: '',
	body: '',
	tagList: () => [],
});

const emit = defineEmits<{
	(e: 'onSubmit', data: Ref<NewArticle>): void;
}>();

const tagValue = ref('');
const tagInput = ref<HTMLInputElement>();
const isShowPreviewMarkdown = ref(false);

const refValidation = ref<Record<keyof NewArticle, ErrorValidation>>({
	title: {
		hasError: false,
		message: undefined,
	},
	description: {
		hasError: false,
		message: undefined,
	},
	body: {
		hasError: false,
		message: undefined,
	},
	tagList: {
		hasError: false,
		message: undefined,
	},
});

const data = ref<NewArticle>({
	title: props.title,
	description: props.description,
	body: props.body,
	tagList: props.tagList,
});

const titleValidation = computed(() => {
	const title = data.value.title;

	return () =>
		validator({
			validate: [
				{
					condition: title.length === 0,
					message: 'Please enter the article title',
				},
				{
					condition: title.length <= 5,
					message: 'A minimum of 5 characters must be included in the article title',
				},
			],
			ref: refValidation.value.title,
		});
});

const descriptionValidation = computed(() => {
	const description = data.value.description;

	return () =>
		validator({
			validate: [
				{
					condition: description.length === 0,
					message: 'Please enter the article description',
				},
				{
					condition: description.length <= 5,
					message: 'A minimum of 5 characters must be included in the article description',
				},
			],
			ref: refValidation.value.description,
		});
});

const bodyValidation = computed(() => {
	const body = data.value.body;

	return () =>
		validator({
			validate: [
				{
					condition: body.length === 0,
					message: 'Please enter the article body',
				},
				{
					condition: body.length <= 15,
					message: 'A minimum of 15 characters must be included in the article body',
				},
			],
			ref: refValidation.value.body,
		});
});

const tagListValidation = computed(() => {
	const tagList = data.value.tagList;

	return () =>
		validator({
			validate: [
				{
					condition: tagList.length === 0,
					message: 'A minimum of 1 tag is required for this article',
				},
				{
					condition: tagList.includes(tagValue.value.trim()),
					message: 'Duplicate tag entered',
				},
			],
			ref: refValidation.value.tagList,
		});
});

const handleAddTags = () => {
	const value = tagValue.value.trim();
	const tagList = data.value.tagList;

	if (value.length === 0 || tagList.includes(value)) return;

	tagValue.value = '';
	data.value.tagList.push(value);
};

const handleDeleteTags = (value: string) => {
	data.value.tagList = data.value.tagList.filter((tag) => tag !== value);
};

const previewMarkdown = computed(() => {
	if (!isShowPreviewMarkdown.value || data.value.body.length === 0 || refValidation.value.body.hasError) return;

	const body = data.value.body.replace(/\\n/gi, '<br />');

	return sanitizeHtml(marked.parse(body, { mangle: false, headerIds: false }));
});

const handleSubmitForm = computed(() => {
	return () => {
		const hasTitleError = titleValidation.value();
		const hasDescriptionError = descriptionValidation.value();
		const hasBodyError = bodyValidation.value();
		const hasTagListError = tagListValidation.value();

		if (hasTitleError || hasDescriptionError || hasBodyError || hasTagListError) return;

		emit('onSubmit', data);
	};
});
</script>

<template>
	<q-form :class="$style.addArticle" class="row q-col-gutter-lg" autocomplete="off">
		<q-input
			v-model="data.title"
			filled
			class="text-body1 col-12"
			type="text"
			inputmode="text"
			label="Article Title"
			name="title"
			:error-message="refValidation.title.message"
			:error="refValidation.title.hasError"
			no-error-icon
			:disable="props.loading"
			@blur="titleValidation"
		/>

		<q-input
			v-model="data.description"
			filled
			class="text-body1 col-12"
			type="text"
			inputmode="text"
			label="What's this article about?"
			name="description"
			:error-message="refValidation.description.message"
			:error="refValidation.description.hasError"
			no-error-icon
			:disable="props.loading"
			@blur="descriptionValidation"
		/>

		<q-input
			v-model="data.body"
			filled
			class="text-body1 col-12"
			:class="$style.bodyWrapper"
			type="textarea"
			inputmode="text"
			label="Write your article (in markdown)"
			name="body"
			:error-message="refValidation.body.message"
			:error="refValidation.body.hasError"
			no-error-icon
			:disable="props.loading"
			@blur="bodyValidation"
		>
			<template #append>
				<q-btn v-if="data.body.length >= 15 && !refValidation.body.hasError" dense no-caps @click="isShowPreviewMarkdown = true"
					>Preview</q-btn
				>
			</template>
		</q-input>

		<div class="col-12">
			<q-input
				ref="tagInput"
				v-model="tagValue"
				filled
				class="text-body1"
				:class="$style.tagsWrapper"
				type="text"
				inputmode="text"
				label="Enter tags (Press enter to add each tag)"
				name="tags"
				:disable="props.loading"
				:error-message="refValidation.tagList.message"
				:error="refValidation.tagList.hasError"
				no-error-icon
				@keyup.enter="
					() => {
						handleAddTags();
						tagListValidation();
					}
				"
				@keyup.delete="
					() => {
						if (data.tagList.length === 0 || tagValue.length !== 0) return;
						data.tagList.splice(-1);
					}
				"
				@blur="tagListValidation"
			>
				<template #prepend>
					<q-list
						v-if="data.tagList.length !== 0"
						tag="ul"
						dense
						class="flex inline row wrap text-body2 items-center justify-start"
						@click="tagInput?.focus()"
					>
						<q-item v-for="(item, index) in data.tagList" :key="index" dense tag="li">
							<q-btn dense flat no-caps :icon="fasTimes" :label="item" @click="handleDeleteTags(item)" />
						</q-item>
					</q-list>
				</template>
			</q-input>
		</div>

		<div class="col-12">
			<q-btn
				label="Publish Article"
				class="full-width"
				size="21.8px"
				no-caps
				type="button"
				:loading="props.loading"
				@click.prevent="handleSubmitForm"
			/>
		</div>
	</q-form>

	<Modal :show="isShowPreviewMarkdown" :hide="() => (isShowPreviewMarkdown = false)" title="Preview Markdown">
		<div :class="$style.previewMarkdown" v-html="previewMarkdown" />
	</Modal>
</template>

<style lang="scss" module>
.addArticle {
	:global {
		.q-field {
			textarea {
				line-height: 1.65rem;
				height: 188px;
				min-height: 188px !important;
				padding: 0;
				resize: none !important;
			}
		} // .q-field

		.q-field__prepend {
			height: auto;
		}

		.q-btn {
			background-color: #d1caff;
			color: #202433;
		} // .q-btn
	} // :global
} // .changeSettings

.bodyWrapper {
	:global {
		.q-field__append {
			position: absolute;
			top: auto;
			bottom: 0;
			right: 12px;
			z-index: 10;
			padding: 0;
			pointer-events: none;
		} // .q-field__append

		.q-btn {
			pointer-events: auto;
		}
	}
} // .bodyWrapper

.tagsWrapper {
	:global {
		.q-field__control {
			height: auto;
		}

		.q-field__prepend {
			max-width: 75%;
			padding-right: 0;
		}
		.q-list {
			gap: 8px;
			padding: 10px 10px 10px 0;

			.q-item {
				min-height: auto;
				padding: 0;
				position: relative;
			} // .q-item

			.q-btn {
				padding: 0 5px 0 7px;
			}

			.on-left {
				margin-right: 3px;
			}

			.q-icon {
				font-size: 0.7rem;
			}
		}
	} // :global
} // .tagsWrapper

.previewMarkdown {
	* {
		font-size: 1.2rem;
		font-weight: 300;
		line-height: 1.9rem;
		letter-spacing: 0.0125em;
		color: #fff;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 2rem;
		letter-spacing: normal;
		padding-bottom: 16px;
	}

	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 1.25rem;
		font-weight: 400;
		line-height: 2rem;
		letter-spacing: normal;
		padding-bottom: 16px;
	}

	blockquote {
		margin: 1em 0;
		border-left: 5px solid #ffffffcf;
		padding: 0 40px;
	}

	a {
		color: #ffffffcf;
		text-decoration: underline;
		text-underline-position: under;

		&:hover,
		&:focus {
			color: #fff;
		}
	}

	ul {
		padding-left: 20px;
	}
} // .previewMarkdown
</style>
