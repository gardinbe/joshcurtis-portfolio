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

			<div class="index__content">
				<div class="index__main-content">
					<hgroup>
						<h1>{{ data.title }}</h1>
					</hgroup>

					<TerminalText
						class="index__subtitle mb-4"
						predetermined-height
					>
						<div v-html="parse(data.content)" />
					</TerminalText>

					<Button
						mode="ghost"
						size="large"
						@click="router.push('contact')"
					>
						{{ data.cta }}
					</Button>
				</div>

				<div class="index__footer">
					<p v-if="data.social_links.data.length > 0">
						Find and contact me on
						<template
							v-for="(link, index) of data.social_links.data"
							:key="link.attributes"
						>
							<template v-if="data.social_links.data.length === 1">
								<a
									target="_blank"
									:href="link.attributes.url"
								>{{ link.attributes.name }}</a>.
							</template>

							<template v-else-if="index === data.social_links.data.length - 1">
								and <a
									target="_blank"
									:href="link.attributes.url"
								>{{ link.attributes.name }}</a>.
							</template>

							<template v-else-if="index === data.social_links.data.length - 2">
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
							:href="strapi.mediaUrl(data.resume.data.attributes.url)"
						>my resume</a> here.
					</p>
				</div>
			</div>
		</template>

		<template #second>
			<StrapiImage
				:image="data.image.data"
				format="large"
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
import SplitContent from "@/components/sections/SplitContent/SplitContent.vue";
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu.vue";
import Button from "@/components/Button/Button.vue";
import TerminalText from "@/components/TerminalText/TerminalText.vue";
import AsyncComponentLoader from "@/components/AsyncComponentLoader/AsyncComponentLoader.vue";
import Panel from "@/components/Panel/Panel.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import { HomeResponse } from "@/types/api/pages/home";
import { strapi } from "@/utils";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { parse } from "marked";

const router = useRouter();

const burgerMenuItems = router.getRoutes()
	.find(route => route.path === "/")?.children
	.map(route => ({
		label: route.name as string | undefined ?? "",
		href: route.path
	})) ?? [];

const panelOpen = ref(router.currentRoute.value.name !== "Index");
router.beforeEach(to => { panelOpen.value = to.name !== "Index"; });

const closePanel = () => {
	void router.push("/");
	panelOpen.value = false; //not strictly necessary
};

const response = await strapi.get<HomeResponse>("home");
const data = response.data.attributes;

</script>

<style scoped src="./Index.scss" />