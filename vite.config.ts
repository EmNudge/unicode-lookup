import { defineConfig } from "rolldown-vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	publicDir: "static",
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
	plugins: [vue()],
});
