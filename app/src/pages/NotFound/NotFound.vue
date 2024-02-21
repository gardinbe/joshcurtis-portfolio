<template>
	<div class="content">
		<hgroup>
			<h1>Page not found</h1>
		</hgroup>
		<p>
			The page or content you are for does not exist or has been removed.
		</p>
		<p>
			Please
			<RouterLink
				to="/"
				aria-label="Return to homepage"
				v-html="'return to the homepage'"
			/>, or try again later.
		</p>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { generateTitle, generateCanonicalUrl } from "~/lib/utils";

const router = useRouter();

useHead({
	title: generateTitle("Page not found"),
	meta: [{ name: "description", content: "The page or content you are for does not exist or has been removed." }],
	link: [{ rel: "canonical", href: generateCanonicalUrl(router) }]
});

</script>

<style scoped src="./NotFound.scss" />