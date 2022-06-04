import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$utils: 'src/utils',
			$stores: 'src/stores',
			$icons: 'src/icons',
			$src: 'src',
		},
	}
};

export default config;
