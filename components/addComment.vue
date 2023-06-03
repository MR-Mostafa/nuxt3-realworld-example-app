<script setup lang="ts"></script>

<template>
	<q-form :class="$style.addComments" autocomplete="off">
		<q-input model-value="" filled class="text-body1" type="textarea" placeholder="Write a comment ..." label="" name="comment">
			<template #label>
				<div class="flex row items-center justify-start">
					<q-avatar icon="img:/sample/demo-avatar.png" size="38px" />
					<p class="q-pl-sm text-white text-body1 text-weight-medium">User Name</p>
				</div>
			</template>
			<template #after>
				<q-btn label="Post Comment" no-caps type="submit" />
			</template>
		</q-input>
	</q-form>
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
			background: transparent !important;
			padding: 0;
			border-radius: 0;

			&::before,
			&::after {
				display: none;
			}

			&:hover,
			&:focus {
				background: transparent;
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
	} // :global
} // .addComments
</style>
