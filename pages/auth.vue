<template>
	<Head>
		<Title>Auth Page</Title>
	</Head>

	<div class="flex row justify-between items-start q-col-gutter-x-lg" :class="$style.authPage">
		<form id="login" class="col-6 q-gutter-lg q-pr-xl">
			<h3 class="text-weight-medium text-h4">Login</h3>
			<q-input standout model-value="" name="email" type="email" inputmode="email" label="Email" placeholder="Enter Your Email Address" />

			<q-input
				standout
				model-value=""
				name="password"
				type="password"
				inputmode="text"
				label="Password"
				placeholder="Enter Your password"
			/>
		</form>

		<form id="register" class="col-6 q-gutter-lg q-pl-xl" autocomplete="off">
			<h3 class="text-weight-medium text-h4">Register</h3>
			<q-input standout model-value="" name="username" type="text" inputmode="text" label="User Name" placeholder="Enter Your User Name" />

			<q-input standout model-value="" name="email" type="email" inputmode="email" label="Email" placeholder="Enter Your Email Address" />

			<q-input standout model-value="" name="password" type="text" inputmode="text" label="Password" placeholder="Enter Your password" />
		</form>
	</div>

	<div class="q-pt-xl text-center">
		<q-btn
			no-caps
			label="Login/Register"
			type="submit"
			size="lg"
			class="login-register full-width"
			:class="$style.loginRegisterBtn"
			form="register"
		/>
	</div>
</template>

<style lang="scss" module>
.authPage {
	position: relative;

	&::after,
	&::before {
		display: block;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	&:before {
		content: '';
		width: 1px;
		height: 100%;
		background-color: #33394f;
	}

	&:after {
		content: 'OR';
		width: 30px;
		height: 40px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: var(--q-dark-page);
	}
} // .authPage

.loginRegisterBtn {
	background-color: #a296bd;
	color: #202433;
	max-width: 700px;
	border-radius: 6px;
	padding: 18px;
} // .login-register
</style>
