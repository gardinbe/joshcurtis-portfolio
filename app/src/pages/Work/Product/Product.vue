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
						{{ data.title }}
					</h1>
					<h4 v-if="data.subtitle !== null">
						{{ data.subtitle }}
					</h4>
				</hgroup>

				<div v-html="parse(data.content)" />
				<ul class="product__tags">
					<li
						v-for="tag of data.tags.data"
						:key="tag.id"
						:style="'--product-tag-color: ' + tag.attributes.color"
						class="product-tag"
						:aria-label="tag.attributes.name"
					>
						{{ tag.attributes.name }}
					</li>
				</ul>
				<Button
					class="product__link"
					size="large"
					mode="filled"
					:href="data.link"
				>
					Visit the site
				</Button>
			</div>
		</template>

		<template #second>
			<StrapiImage
				:image="data.image"
				format="large"
				lazy
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import Button from "@/components/Button/Button.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import SplitContent from "@/components/sections/SplitContent/SplitContent.vue";
import { ProductResponse } from "@/types/api/pages/products";
import { strapi } from "@/utils";
import { parse } from "marked";
import { useRouter } from "vue-router";

const router = useRouter();

if (typeof router.currentRoute.value.params.productID !== "string")
	throw new Error("Missing product ID from request");

const productID = parseInt(router.currentRoute.value.params.productID);

const response = await strapi.get<ProductResponse>(`products/${productID}`);
const data = response.data.attributes;

</script>

<style scoped src="./Product.scss" />