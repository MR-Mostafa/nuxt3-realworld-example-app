<template>
	<q-card tag="article" square flat :class="$style.article">
		<q-card-section>
			<header>
				<h1 class="text-h5">
					<NuxtLink to="/" class="text-white"
						>If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!
					</NuxtLink>
				</h1>

				<div class="flex row items-center justify-between q-py-md q-mb-sm">
					<Avatar />

					<div class="flex row items-center justify-between">
						<Like />
						<Follow class="q-ml-md" />
					</div>
				</div>
			</header>

			<p class="text-h6 text-weight-light">Article Text ...</p>

			<footer class="q-pt-lg flex row items-center justify-between">
				<ArticleTags />
			</footer>
		</q-card-section>
	</q-card>

	<q-separator :class="$style.separator" />

	<div :class="$style.commentsWrapper">
		<div class="">
			<p class="flex row items-center justify-start q-pb-lg">
				<span class="text-h5 q-pr-md">Responses</span>
				<span class="number text-h6">25</span>
			</p>
		</div>
		<AddComment />

		<Comments />
		<Comments />
		<Comments />
		<Comments />
	</div>
</template>

<style lang="scss" module>
.article {
	background-color: transparent;
} // .article

.separator {
	height: 4px;
	background-color: #33394f;
	margin: 0.5rem 0 1.5rem;
}

.commentsWrapper {
	:global {
		.number {
			background-color: #d1caff;
			border-radius: 5px;
			color: #000;
			width: 34px;
			height: 34px;
			text-align: center;
		}
	} // :global
} // .commentsWrapper
</style>
