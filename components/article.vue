<template>
	<q-card tag="article" :class="$style.article">
		<q-card-section class="q-pa-lg">
			<header>
				<h1 class="text-h5">
					<NuxtLink to="/" class="text-white"
						>If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!
					</NuxtLink>
				</h1>

				<div class="flex row items-center justify-between q-py-md q-mb-sm">
					<Avatar />
					<Like />
				</div>
			</header>

			<p class="text-h6 text-weight-light">The three main languages you need to know well are HTML, CSS, and JavaScript...</p>

			<footer class="q-pt-lg flex row items-center justify-between">
				<BtnMore />
				<ArticleTags />
			</footer>
		</q-card-section>
	</q-card>
</template>

<style lang="scss" module>
.article {
	background: #252d3a;
	box-shadow: 10px 10px 0px rgba(2, 2, 2, 0.45);
	border-radius: 15px;

	& + .article {
		margin-top: 2.5rem;
	}
} // .article
</style>
