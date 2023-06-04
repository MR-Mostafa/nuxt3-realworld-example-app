<template>
	<footer class="q-py-md q-px-xl text-center">
		<p>
			The design is inspired by
			<a
				href="https://www.figma.com/file/upjI9NopFEtjKzpDAWo38x/DigiForum-Apps-(Community)?type=design&t=HMFczWpmsCQV5qZ0-0"
				target="_blank"
				rel="noopener noreferrer"
				>DigiForum</a
			>, and this project is licensed under the MIT license.
		</p>
	</footer>
</template>

<style lang="scss" scoped>
footer {
	border-top: 1px dotted #ffffff1a;
}
a {
	text-decoration: none;
	color: #fff;
	transition: color 0.15s ease-in-out;

	&:hover,
	&:focus {
		color: darken($color: #fff, $amount: 25);
	}
}
</style>
