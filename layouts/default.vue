<template>
	<q-layout view="hHh lpR fFf" class="flex column">
		<Header />

		<q-page-container class="q-my-xl q-px-xl">
			<slot />
		</q-page-container>

		<Footer />
	</q-layout>
</template>

<style lang="scss" scoped>
.q-layout {
	min-height: 100%;
	min-height: 100dvh;
}

.q-page-container {
	flex: 1 1 auto;
}
</style>
