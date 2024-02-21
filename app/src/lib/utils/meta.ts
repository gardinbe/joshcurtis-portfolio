import { UseHeadInput } from "@unhead/vue";
import { Router } from "vue-router";
import { Meta } from "~/lib/types/strapi-data/components";

/**
 * Generates and returns the generated meta head tags for a page for unhead.
 * @param meta - Target page metadata
 * @param router - Active Vue router instance
 * @returns Generated unhead tags
 */
export const generatePageHead = (meta: Meta, router: Router): UseHeadInput => ({
	title: generateTitle(meta.title),
	meta: [{ name: "description", content: meta.description }],
	link: [{ rel: "canonical", href: generateCanonicalUrl(router) }]
});

/**
 * Returns the meta title for a given title ending.
 * @param ending - Title ending
 * @returns Full title
 */
export const generateTitle = (ending?: string) =>
	ending
		? `Joshua Curtis · ${ending}`
		: "Joshua Curtis";

/**
 * Returns the canonical URL for the current route.
 * @param router - Active Vue router instance
 * @returns Canonical URL
 */
export const generateCanonicalUrl = (router: Router) =>
	`https://joshuacurtis.dev${router.resolve(router.currentRoute.value.name ? { name: router.currentRoute.value.name } : router.currentRoute.value).path}`;