<template>
	<div class="q-pa-lg flex flex-center" :class="$style.pagination">
		<q-pagination flat unelevated ellipses gutter="8px" active-c :model-value="2" :max="20" max-pages="15" />
	</div>
</template>

<style lang="scss" module>
.pagination {
	:global {
		.q-pagination__middle {
			& + .q-btn {
				pointer-events: none;
			}
		} // .q-pagination__middle
		.q-btn {
			font-size: 18px;
			padding: 3px 2px;
			background-color: #d9d9d9;
			color: #33394f !important;
		}

		.bg-primary {
			background-color: #252d3a !important;
			color: #fff !important;
			pointer-events: none;
		}
	} // :global
} // .pagination
</style>
