import Loader from "@/components/Loader/Loader.vue";
import { Component, defineAsyncComponent, defineComponent, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const lazyLoad = (lazyComponent: () => Promise<unknown>) => {
	const asyncComponent = defineAsyncComponent({
		loader: lazyComponent as () => Promise<Component>,
		loadingComponent: Loader as Component
	});
	return defineComponent({
		render() {
			return h(asyncComponent);
		}
	});
};

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "404",
			path: "/:pathMatch(.*)*",
			component: lazyLoad(() => import("@/pages/404/404.vue"))
		},
		{
			name: "Index",
			path: "/",
			component: lazyLoad(() => import("@/pages/Index/Index.vue")),
			children: [
				{
					name: "About",
					path: "/about",
					component: lazyLoad(() => import("@/pages/About/About.vue"))
				},
				{
					name: "My work",
					path: "/my-work",
					component: lazyLoad(() => import("@/pages/Work/Work.vue")),
					children: [
						{
							name: "Product",
							path: ":productID",
							component: lazyLoad(() => import("@/pages/Work/Product/Product.vue"))
						}
					]
				},
				{
					name: "Contact",
					path: "/contact",
					component: lazyLoad(() => import("@/pages/Contact/Contact.vue"))
				}
			]
		}
	]
});