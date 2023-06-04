<template>
	<q-form :class="$style.addArticle" class="row q-col-gutter-lg" autocomplete="off">
		<q-input model-value="" filled class="text-body1 col-12" type="text" inputmode="text" label="Article Title" name="title" />

		<q-input
			model-value=""
			filled
			class="text-body1 col-12"
			type="text"
			inputmode="text"
			label="What's this article about?"
			name="description"
		/>

		<q-input
			model-value=""
			filled
			class="text-body1 col-12"
			type="textarea"
			inputmode="text"
			label="Write your article (in markdown)"
			name="body"
		/>

		<div class="col-12">
			<q-input model-value="" filled class="text-body1" type="text" inputmode="text" label="Enter tags" name="tags" />

			<ArticleTags class="q-pt-sm" />
		</div>

		<div class="col-12">
			<q-btn label="Publish Article" class="full-width" size="21.8px" no-caps type="submit" />
		</div>
	</q-form>
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

		.q-btn {
			background-color: #d1caff;
			color: #202433;
		} // .q-btn
	} // :global
} // .changeSettings
</style>
