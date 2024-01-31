<!-- eslint-disable vue/no-v-html -->
<template>
	<StandardContent has-button>
		<hgroup>
			<h1>{{ page.attributes.title }}</h1>
		</hgroup>

		<p v-html="parse(page.attributes.content)" />
		<div class="social-link-icons">
			<Button
				v-for="link of page.attributes.social_links.data"
				:key="link.id"
				:style="{ backgroundColor: link.attributes.background_color }"
				class="social-link-icon"
				type="anchor"
				mode="filled-dark"
				:href="link.attributes.url"
			>
				<StrapiImage
					:image="link.attributes.icon.data"
					format="thumbnail"
					:fallback-color="false"
					eager
				/>
			</Button>
		</div>
	</StandardContent>
</template>

<script setup lang="ts">
import { parse } from "marked";
import StandardContent from "@/components/StandardContent/StandardContent.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import Button from "@/components/Button/Button.vue";
import { strapi } from "@/lib/services";
import { throwContentError } from "@/lib/utils";

const page = await strapi.getContactPage()
	.catch(throwContentError);

</script>

<style scoped src="./Contact.scss" />