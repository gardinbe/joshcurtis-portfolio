<!-- eslint-disable vue/no-v-html -->
<template>
	<SplitContent
		second-slot-type="image"
		class="product"
		has-back-btn
	>
		<template #first>
			<div class="product__main-content">
				<hgroup>
					<h1>
						{{ page.attributes.title }}
					</h1>
					<h4 v-if="page.attributes.subtitle !== null">
						{{ page.attributes.subtitle }}
					</h4>
				</hgroup>

				<div v-html="parse(page.attributes.content)" />
				<ul class="product__tags">
					<li
						v-for="tag of page.attributes.tags.data"
						:key="tag.id"
						:style="'--product-tag-color: ' + tag.attributes.color"
						class="product-tag"
						:aria-label="tag.attributes.name"
					>
						{{ tag.attributes.name }}
					</li>
				</ul>
				<Button
					mode="filled"
					class="product__link"
					size="large"
					:href="page.attributes.link"
				>
					Visit the site
				</Button>
			</div>
		</template>

		<template #second>
			<StrapiImage
				:image="page.attributes.image.data"
				format="large"
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import { parse } from "marked";
import { useRouter } from "vue-router";
import Button from "@/components/Button/Button.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import SplitContent from "@/components/SplitContent/SplitContent.vue";
import { strapi } from "@/lib/services";
import { notFound } from "@/lib/utils";

const router = useRouter();

const slug = router.currentRoute.value.params.slug;
if (typeof slug !== "string")
	throw new Error("Missing product slug from request");

const page = await strapi.getProduct({ slug })
	.catch(notFound);

</script>

<style scoped src="./Product.scss" />