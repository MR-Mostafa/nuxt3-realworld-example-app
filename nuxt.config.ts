// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['@/assets/styles/styles.scss'],
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Nuxt3 Realworld Example App',
			meta: [
				{
					name: 'description',
					content: 'Realworld Conduit was built by Nuxt3, Vue3, Quasar and etc',
				},
				{ name: 'keywords', content: 'vuejs,nuxt,quasar,realworld,realworld-frontend,vue3,nuxt3' },
			],
		},
	},
	modules: [
		[
			'nuxt-quasar-ui',
			{
				sassVariables: '/assets/styles/_quasar.variables.scss',
				config: {
					dark: true,
					brand: {
						'dark': '#272D43',
						'dark-page': '#202433',
					},
				},
			},
		],
		'@nuxtjs/eslint-module',
	],
	components: [{ path: '~/components/icons', pathPrefix: false }, '~/components'],
});
