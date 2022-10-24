require('dotenv').config()

export default {
	ssr: true,
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		script: [
			{
				src: 'https://cdn.jsdelivr.net/npm/scichart@2.2.2415/_wasm/scichart.browser.js',
			},
		],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: 'var(--red-color)' },
	/*
	 ** Global CSS
	 */

	css: [
		{ src: '@assets/styles/main.scss', lang: 'scss' },
		'~/assets/fonts/icons/main.css',
	],
	/*
	 ** Plugins to load before mounting the App
	 */

	publicRuntimeConfig: {
		host: process.env.NUXT_HOST,
		port: process.env.NUXT_PORT,
		axios: {
			browserBaseURL: process.env.NUXT_ENV_API_URL,
		},
		clientURL: process.env.NUXT_ENV_CLIENT_URL,
		version: process.env.NUXT_ENV_VERSION_APP,
		scichartKey: process.env.NUXT_ENV_SCICHART_KEY,
	},

	privateRuntimeConfig: {
		axios: {
			baseURL: process.env.NUXT_ENV_API_URL,
		},
	},
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
		'@nuxtjs/pwa',
		// Doc: https://github.com/nuxt-community/stylelint-module
		'@nuxtjs/stylelint-module',
		// Doc: https://github.com/nuxt-community/date-fns-module
		'@nuxtjs/date-fns',
		'@nuxtjs/color-mode',
	],
	/*
	 ** Nuxt.js modules
	 */
	colorMode: {
		preference: 'light',
		fallback: 'light',
		classSuffix: '',
	},
	/*
	 ** Scichart key
	 */
	scichart: {
		key: process.env.NUXT_ENV_SCICHART_KEY,
	},

	/*
	 ** Build configuration
	 */
	modern: process.env.NODE_ENV === 'production',
	build: {
		postcss: {
			preset: {
				features: {
					customProperties: false,
				},
			},
		},
	},
}
