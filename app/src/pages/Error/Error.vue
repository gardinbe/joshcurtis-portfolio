<template>
	<div class="content">
		<hgroup>
			<h1>Internal application error</h1>
		</hgroup>
		<p>
			The application has unfortunately ran into an internal error.
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
	title: generateTitle("Internal application error"),
	meta: [{ name: "description", content: "The application has unfortunately ran into an internal error." }],
	link: [{ rel: "canonical", href: generateCanonicalUrl(router) }]
});

</script>

<style scoped src="./Error.scss" />