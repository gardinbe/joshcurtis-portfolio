<template>
	<SplitContent
		second-slot="image"
		sizing="enlarge-first"
		has-button
	>
		<template #first>
			<hgroup>
				<h1>
					{{ page.attributes.title }}
				</h1>
				<p
					v-if="page.attributes.subtitle"
					class="subtitle subtitle--large"
				>
					{{ page.attributes.subtitle }}
				</p>
			</hgroup>

			<div v-html="md(page.attributes.content)" />
			<ul class="tags">
				<li
					v-for="tag of page.attributes.tags.data"
					:key="tag.id"
					:style="'--tag-color: ' + tag.attributes.color"
					class="tag"
					:aria-label="tag.attributes.name"
				>
					{{ tag.attributes.name }}
				</li>
			</ul>
			<Button
				class="link"
				type="anchor"
				mode="filled"
				size="large"
				:href="page.attributes.link"
				aria-label="Open page"
			>
				Visit the site
			</Button>
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
import Button from "~/components/Button/Button.vue";
import StrapiImage from "~/components/StrapiImage/StrapiImage.vue";
import SplitContent from "~/components/SplitContent/SplitContent.vue";
import { cms } from "~/lib/services/instances";
import { md, throwNotFoundError, notFoundError } from "~/lib/utils";

const router = useRouter();

const slug = router.currentRoute.value.params.slug;
if (typeof slug !== "string")
	throw notFoundError();

const page = await cms.getProduct({ slug })
	.catch(throwNotFoundError);

</script>

<style scoped src="./Product.scss" />