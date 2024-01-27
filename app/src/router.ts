import { Component, defineAsyncComponent, defineComponent, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Loader from "@/components/Loader/Loader.vue";

/**
 * Quick wrapper around internal vue component definitions to
 * render a loader while a component is loading.
 *
 * This is Vue black magic...
 * @param lazyComponent - Component to be lazy-loaded
 */
const lazyLoad = <T extends Component>(lazyComponent: () => Promise<T>) => {
	const asyncComponent = defineAsyncComponent({
		loader: lazyComponent,
		loadingComponent: Loader as Component
	});

	return defineComponent({ render: () => h(asyncComponent) });
};

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "NotFound",
			path: "/:pathMatch(.*)*",
			component: lazyLoad(async () =>
				import("@/pages/NotFound/NotFound.vue"))
		},
		{
			name: "Home",
			path: "/",
			component: lazyLoad(async () =>
				import("@/pages/Home/Home.vue")),
			children: [
				{
					name: "About",
					path: "/about",
					component: lazyLoad(async () =>
						import("@/pages/About/About.vue"))
				},
				{
					name: "My work",
					path: "/my-work",
					component: lazyLoad(async () =>
						import("@/pages/Work/Work.vue")),
					children: [
						{
							name: "Product",
							path: ":slug",
							component: lazyLoad(async () =>
								import("@/pages/Work/Product/Product.vue"))
						}
					]
				},
				{
					name: "Contact",
					path: "/contact",
					component: lazyLoad(async () =>
						import("@/pages/Contact/Contact.vue"))
				}
			]
		}
	]
});