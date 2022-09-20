import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
