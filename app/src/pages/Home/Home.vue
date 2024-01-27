<!-- eslint-disable vue/no-v-html -->

<!-- also known as 'Home' ! -->

<template>
	<SplitContent
		viewport-height
		second-slot-type="image"
		class="index"
	>
		<template #first>
			<BurgerMenu :items="burgerMenuItems" />

			<div class="home__content">
				<div class="home__main-content">
					<hgroup>
						<h1>{{ page.attributes.title }}</h1>
					</hgroup>

					<TerminalText
						class="home__subtitle mb-4"
						predetermine-height
					>
						<div v-html="parse(page.attributes.content)" />
					</TerminalText>

					<Button
						mode="ghost"
						size="large"
						@click="router.push('contact')"
					>
						{{ page.attributes.cta }}
					</Button>
				</div>

				<div class="home__footer">
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
						Download
						<a
							target="_blank"
							:href="strapiMedia.url(
								page.attributes.resume.data.attributes.url
							)"
						>my resume</a> here.
					</p>
				</div>
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

	<Panel
		:open="panelOpen"
		:close-action="closePanel"
	>
		<RouterView v-slot="{ Component }">
			<AsyncComponentLoader :component="Component" />
		</RouterView>
	</Panel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { parse } from "marked";
import SplitContent from "@/components/SplitContent/SplitContent.vue";
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu.vue";
import Button from "@/components/Button/Button.vue";
import TerminalText from "@/components/TerminalText/TerminalText.vue";
import AsyncComponentLoader from "@/components/AsyncComponentLoader/AsyncComponentLoader.vue";
import Panel from "@/components/Panel/Panel.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import { strapi, strapiMedia } from "@/lib/services";

const router = useRouter();

const burgerMenuItems = router.getRoutes()
	.find(route => route.path === "/")?.children
	.map(route => ({
		label: route.name as string | undefined ?? "",
		href: route.path
	})) ?? [];

const panelOpen = ref(router.currentRoute.value.name !== "Home");
router.beforeEach(to => { panelOpen.value = to.name !== "Home"; });

const closePanel = () => {
	void router.push("/");
	panelOpen.value = false; //not strictly necessary
};

const page = await strapi.getHomePage();

</script>

<style scoped src="./Home.scss" />