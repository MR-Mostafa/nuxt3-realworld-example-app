<template>
	<q-form :class="$style.changeSettings" class="row q-col-gutter-lg" autocomplete="off">
		<q-input model-value="" filled class="text-body1 col-12" type="url" inputmode="url" label="URL of profile picture" name="image" />

		<q-input model-value="" filled class="text-body1 col-6" type="textarea" inputmode="text" label="Short bio about you" name="bio" />

		<div class="col-6 column q-col-gutter-y-lg">
			<q-input model-value="" filled class="text-body1" type="text" inputmode="text" label="Username" name="username" />

			<q-input model-value="" filled class="text-body1" type="email" inputmode="email" label="Email" name="email" />

			<q-input model-value="" filled class="text-body1" type="text" inputmode="password" label="Password" name="password" />
		</div>

		<div class="col-12">
			<q-btn label="Update Settings" class="full-width" size="21.8px" no-caps type="submit" />
		</div>
	</q-form>
</template>

<style lang="scss" module>
.changeSettings {
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
