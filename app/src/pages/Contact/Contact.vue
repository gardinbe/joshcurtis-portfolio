<!-- eslint-disable vue/no-v-html -->
<template>
	<StandardContent
		class="contact"
		has-back-btn
	>
		<div class="contact__content">
			<hgroup>
				<h1>{{ data.title }}</h1>
			</hgroup>

			<p v-html="parse(data.content)" />
			<ul class="social-link-icons">
				<li
					v-for="link of data.social_links.data"
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
							:image="link.attributes.icon"
							format="thumbnail"
							lazy
							no-fallback-color
						/>
					</Button>
				</li>
			</ul>
		</div>
	</StandardContent>
</template>

<script setup lang="ts">
import StandardContent from "@/components/sections/StandardContent/StandardContent.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import Button from "@/components/Button/Button.vue";
import { ContactResponse } from "@/types/api/pages/contact";
import { strapi } from "@/utils";
import { parse } from "marked";

const response = await strapi.get<ContactResponse>("contact");
const data = response.data.attributes;

</script>

<style scoped src="./Contact.scss" />