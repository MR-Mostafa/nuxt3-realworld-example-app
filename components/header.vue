<script setup lang="ts">
import { fasChevronLeft, fasChevronRight } from '@quasar/extras/fontawesome-v5';
</script>

<template>
	<q-header reveal class="bg-dark text-white no-border" :class="$style.header">
		<q-toolbar>
			<q-avatar square size="48px">
				<img src="~/assets/images/logo.png" width="48" height="48" alt="Realworld Logo" />
			</q-avatar>

			<q-toolbar-title shrink class="column">
				<h1 class="text-subtitle1 text-weight-medium q-ma-none q-py-xs">Conduit</h1>
				<h2 class="text-caption q-ma-none">Share Knowledge</h2>
			</q-toolbar-title>

			<div class="search-wrapper q-px-lg col-grow">
				<q-input filled dense borderless dark model-value="" name="search" type="text" inputmode="text" placeholder="Explore...">
					<template #prepend>
						<IconsSearch />
					</template>
				</q-input>
			</div>

			<nav class="nav-wrapper relative-position self-stretch" :class="$style.navWrapper" role="navigation">
				<q-tabs class="q-px-xs" :right-icon="fasChevronRight" :left-icon="fasChevronLeft">
					<q-route-tab label="Home" to="/" exact />
					<q-route-tab label="About" to="/about" exact />
					<q-route-tab label="Contact Us" to="/contact" exact />
				</q-tabs>
			</nav>
		</q-toolbar>
	</q-header>
</template>

<style lang="scss" module>
.header {
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	:global {
		.q-toolbar {
			& > *:not(.nav-wrapper) {
				padding-top: 10px;
				padding-bottom: 10px;
				box-sizing: content-box;
			}
		} // .q-toolbar

		h1,
		h2 {
			line-height: 1.25rem;
		}

		.q-input {
			max-width: 320px;
		} // .q-input
	} // :global
} // .header

.navWrapper {
	/* width: 400px; */

	:global {
		.q-tabs {
			height: 115%;
			background: linear-gradient(152.9deg, #77a6dc 0.44%, #585ef5 100%);
			border-radius: 10px;
		}

		.q-icon {
			svg {
				max-height: 27px;
			}
		}

		.q-tabs__content {
			justify-content: center;
		}

		.q-tab {
			padding: 0 22px;
			margin: 0 6px;
			opacity: 1;
			flex-grow: 0;
			text-transform: none;
		}

		.q-tab__label {
			font-size: 1.1rem;
			font-weight: 600;
		}
	} // :global
} // .navWrapper
</style>
