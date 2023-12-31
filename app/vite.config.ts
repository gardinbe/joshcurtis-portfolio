import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
	plugins: [
		vue(),
		compression(), //gzip
		compression({ algorithm: "brotliCompress", exclude: [/\.(br)$/, /\.(gz)$/], deleteOriginalAssets: false }) //brotli
	],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "node_modules"),
			"@": path.resolve(__dirname, "src")
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "~/bootstrap/scss/functions";
					@import "~/bootstrap/scss/mixins/breakpoints";
					@import "~/bootstrap/scss/variables";
					@import "~/bootstrap/scss/vendor/rfs";		
					@import "@/scss/functions";
					@import "@/scss/mixins";
					@import "@/scss/variables";
				`
			}
		}
	}
});