import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import solidStyled from "unplugin-solid-styled";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, "src/lib"),
			$components: path.resolve(__dirname, "src/components"),
			$utils: path.resolve(__dirname, "src/utils"),
			$stores: path.resolve(__dirname, "src/stores"),
			$icons: path.resolve(__dirname, "src/icons"),
			$src: path.resolve(__dirname, "src"),
		},
	},
	plugins: [
		solid(),
		solidStyled.vite({
			prefix: "unicode",
			filter: {
				include: "src/**/*.tsx",
				exclude: "node_modules/**/*.{ts,js}",
			},
		}),
	],
});
