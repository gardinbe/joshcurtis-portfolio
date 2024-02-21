import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
	plugins: [
		vue(),
		compression(), //gzip
		compression({
			algorithm: "brotliCompress",
			exclude: [/\.(br)$/, /\.(gz)$/],
			deleteOriginalAssets: false
		}) //brotli
	],
	resolve: {
		alias: {
			"~modules": path.resolve(__dirname, "node_modules"),
			"~": path.resolve(__dirname, "src")
		}
	},
	publicDir: path.resolve(__dirname, "public"),
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "~modules/bootstrap/scss/functions";
					@import "~modules/bootstrap/scss/mixins/breakpoints";
					@import "~modules/bootstrap/scss/variables";
					@import "~modules/bootstrap/scss/vendor/rfs";		
					@import "~/lib/scss/functions";
					@import "~/lib/scss/mixins";
					@import "~/lib/scss/variables";
				`
			}
		}
	}
});