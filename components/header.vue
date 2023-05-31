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
		</q-toolbar>
	</q-header>
</template>

<style lang="scss" module>
.header {
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	:global {
		h1,
		h2 {
			line-height: 1.25rem;
		}

		.q-input {
			max-width: 320px;
		} // .search-wrapper
	} // :global
}
</style>
