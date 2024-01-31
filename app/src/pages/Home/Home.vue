<!-- eslint-disable vue/no-v-html -->
<template>
	<SplitContent
		class="content"
		second-slot-type="image"
		sizing="enlarge-first"
		has-button
	>
		<template #button>
			<NavMenu
				class="nav-menu"
				:items="navItems"
			/>
		</template>

		<template #first>
			<hgroup class="heading">
				<h1>{{ page.attributes.title }}</h1>
			</hgroup>

			<TerminalText
				class="terminal-text"
				predetermine-height
			>
				<div v-html="parse(page.attributes.content)" />
			</TerminalText>

			<Button
				class="contact-btn"
				type="router-link"
				mode="ghost"
				size="large"
				aria-label="Open contact page"
				href="/contact"
			>
				{{ page.attributes.cta }}
			</Button>

			<div class="footer">
				<p v-if="page.attributes.social_links.data.length > 0">
					Find and contact me on
					<template
						v-for="(link, index) of page.attributes.social_links.data"
						:key="link.attributes"
					>
						<template v-if="page.attributes.social_links.data.length === 1">
							<a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>.
						</template>

						<template v-else-if="index === page.attributes.social_links.data.length - 1">
							and <a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>.
						</template>

						<template v-else-if="index === page.attributes.social_links.data.length - 2">
							<a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>
						</template>

						<template v-else>
							<a
								target="_blank"
								:href="link.attributes.url"
							>{{ link.attributes.name }}</a>,
						</template>
					</template>
				</p>

				<p>
					Download <a
						target="_blank"
						:href="strapiMedia.url(
							page.attributes.resume.data.attributes.url
						)"
					>my resume</a> here.
				</p>
			</div>
		</template>

		<template #second>
			<StrapiImage
				:image="page.attributes.image.data"
				format="large"
				eager
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { parse } from "marked";
import SplitContent from "@/components/SplitContent/SplitContent.vue";
import NavMenu, { NavItem } from "@/components/NavMenu/NavMenu.vue";
import Button from "@/components/Button/Button.vue";
import TerminalText from "@/components/TerminalText/TerminalText.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import { strapi, strapiMedia } from "@/lib/services";
import { throwContentError } from "@/lib/utils";

const router = useRouter();

const navItems: NavItem[] = [
	{
		label: "About",
		link: router.resolve({ name: "about" }).href
	},
	{
		label: "My work",
		link: router.resolve({ name: "work" }).href
	},
	{
		label: "Contact",
		link: router.resolve({ name: "contact" }).href
	}
];

const page = await strapi.getHomePage()
	.catch(throwContentError);

</script>

<style scoped src="./Home.scss" />