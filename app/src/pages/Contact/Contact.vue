<!-- eslint-disable vue/no-v-html -->
<template>
	<StandardContent
		class="contact"
		has-back-btn
	>
		<div class="contact__content">
			<hgroup>
				<h1>{{ page.attributes.title }}</h1>
			</hgroup>

			<p v-html="parse(page.attributes.content)" />
			<ul class="social-link-icons">
				<li
					v-for="link of page.attributes.social_links.data"
					:key="link.id"
				>
					<Button
						mode="filled-dark"
						class="social-link-icon"
						:style="{ backgroundColor: link.attributes.background_color }"
						:href="link.attributes.url"
						target="_blank"
					>
						<StrapiImage
							:image="link.attributes.icon.data"
							format="thumbnail"
							:fallback-color="false"
						/>
					</Button>
				</li>
			</ul>
		</div>
	</StandardContent>
</template>

<script setup lang="ts">
import { parse } from "marked";
import StandardContent from "@/components/StandardContent/StandardContent.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import Button from "@/components/Button/Button.vue";
import { strapi } from "@/lib/services";

const page = await strapi.getContactPage();

</script>

<style scoped src="./Contact.scss" />