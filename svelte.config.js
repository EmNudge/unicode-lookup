import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$utils: 'src/utils',
			$stores: 'src/stores',
			$icons: 'src/icons',
			$src: 'src',
		},
	},
};

export default config;
