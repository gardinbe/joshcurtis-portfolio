//this shim is required for typescript to understand `.vue` files
declare module "*.vue" {
	import Vue from "vue";

	export default Vue;
}