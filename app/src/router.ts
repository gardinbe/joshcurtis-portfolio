import { Component, defineAsyncComponent, defineComponent, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Loader from "@/components/Loader/Loader.vue";

/**
 * Routes can only resolve single components: create intermediary
 * component to show/switch loader and route component.
 *
 * https://stackoverflow.com/a/59092610
 *
 * This is dodgy Vue business...
 * @param component - Target component to be lazy-loaded
 */
const lazy = <T extends Component>(component: Promise<T>) => {
	const asyncComponent = defineAsyncComponent({
		loader: async () => component,
		loadingComponent: Loader
	});

	return defineComponent({ render: () => h(asyncComponent) });
};

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "not-found",
			path: "/:pathMatch(.*)*",
			component: lazy(import("@/pages/NotFound/NotFound.vue"))
		},
		{
			name: "internal-error",
			path: "/internal-error",
			component: lazy(import("@/pages/InternalError/InternalError.vue"))
		},
		{
			name: "home",
			path: "/",
			component: lazy(import("@/pages/Home/Home.vue")),
			children: [
				{
					name: "about",
					path: "/about",
					component: lazy(import("@/pages/About/About.vue"))
				},
				{
					name: "work",
					path: "/my-work",
					component: lazy(import("@/pages/Work/Work.vue")),
					children: [
						{
							name: "Product",
							path: ":slug",
							component: lazy(import("@/pages/Work/Product/Product.vue"))
						}
					]
				},
				{
					name: "contact",
					path: "/contact",
					component: lazy(import("@/pages/Contact/Contact.vue"))
				}
			]
		}
	]
});