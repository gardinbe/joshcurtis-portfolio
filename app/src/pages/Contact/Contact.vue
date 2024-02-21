<template>
	<StandardContent has-button>
		<hgroup>
			<h1>{{ page.attributes.title }}</h1>
		</hgroup>

		<p v-html="md(page.attributes.content)" />

		<div class="social-link-icons">
			<Button
				v-for="link of page.attributes.social_links.data"
				:key="link.id"
				:style="{ backgroundColor: link.attributes.background_color }"
				class="social-link-icon"
				type="anchor"
				mode="filled-dark"
				:href="link.attributes.url"
				:aria-label="link.attributes.name"
			>
				<StrapiImage
					type="img"
					:image="link.attributes.icon.data"
					target-format="thumbnail"
					no-fallback-color
					eager
				/>
			</Button>
		</div>
	</StandardContent>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import StandardContent from "~/components/StandardContent/StandardContent.vue";
import StrapiImage from "~/components/StrapiImage/StrapiImage.vue";
import Button from "~/components/Button/Button.vue";
import { cms } from "~/lib/services/instances";
import { md, throwContentError, generatePageHead } from "~/lib/utils";

const router = useRouter();

const page = await cms.getContactPage()
	.catch(throwContentError);

useHead(generatePageHead(page.attributes.meta, router));

</script>

<style scoped src="./Contact.scss" />