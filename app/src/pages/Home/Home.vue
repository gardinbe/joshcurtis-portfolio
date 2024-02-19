<template>
	<SplitContent
		class="content"
		second-slot="image"
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

			<TerminalTyper
				class="terminal-typer"
				no-layout-shift
				:content="md(page.attributes.content)"
			/>

			<Button
				class="contact-btn"
				type="router-link"
				mode="ghost"
				size="large"
				href="/contact"
				aria-label="Open contact page"
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
								:aria-label="link.attributes.name"
							>{{ link.attributes.name }}</a>.
						</template>

						<template v-else-if="index === page.attributes.social_links.data.length - 1">
							and <a
								target="_blank"
								:href="link.attributes.url"
								:aria-label="link.attributes.name"
							>{{ link.attributes.name }}</a>.
						</template>

						<template v-else-if="index === page.attributes.social_links.data.length - 2">
							<a
								target="_blank"
								:href="link.attributes.url"
								:aria-label="link.attributes.name"
							>{{ link.attributes.name }}</a>
						</template>

						<template v-else>
							<a
								target="_blank"
								:href="link.attributes.url"
								:aria-label="link.attributes.name"
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
						aria-label="My resume"
					>my resume</a> here.
				</p>
			</div>
		</template>

		<template #second>
			<StrapiImage
				type="picture"
				:image="page.attributes.image.data"
				eager
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SplitContent from "~/components/SplitContent/SplitContent.vue";
import NavMenu, { NavItem } from "~/components/NavMenu/NavMenu.vue";
import Button from "~/components/Button/Button.vue";
import TerminalTyper from "~/components/TerminalTyper/TerminalTyper.vue";
import StrapiImage from "~/components/StrapiImage/StrapiImage.vue";
import { cms, strapiMedia } from "~/lib/services/instances";
import { md, throwContentError } from "~/lib/utils";

const router = useRouter();

const routeLink = (name: string) =>
	router.resolve({ name }).href;

const navItems: NavItem[] = [
	{ label: "About", link: routeLink("about") },
	{ label: "My work", link: routeLink("work") },
	{ label: "Contact", link: routeLink("contact") }
];

const page = await cms.getHomePage()
	.catch(throwContentError);

</script>

<style scoped src="./Home.scss" />