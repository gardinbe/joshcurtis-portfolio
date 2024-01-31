<!-- eslint-disable vue/no-v-html -->
<template>
	<SplitContent
		second-slot-type="swiper"
		sizing="enlarge-second"
		has-button
	>
		<template #first>
			<hgroup>
				<h1>{{ page.attributes.title }}</h1>
			</hgroup>

			<div v-html="parse(page.attributes.content)" />
		</template>

		<template #second>
			<Swiper
				id="productSwiper"
				:speed="150"
				:space-between="16"
				centered-slides
				navigation
				:pagination="{ clickable: true }"
				:breakpoints="{
					1400: { slidesPerView: 2 },
					1200: { slidesPerView: 1.75 },
					992: { slidesPerView: 1.5 },
					768: { slidesPerView: 2 },
					0: { slidesPerView: 1.35 }
				}"
			>
				<SwiperSlide
					v-for="product of page.attributes.products.data"
					:key="product.id"
					:style="strapiMedia.createBackground(
						product.attributes.image.data,
						'large'
					)"
					class="product"
					tag="a"
					:href="`${$route.path}/${product.attributes.slug}`"
					:aria-label="product.attributes.title"
					@click="productClick"
				>
					<div class="product__overlay">
						<hgroup>
							<h2>{{ product.attributes.title }}</h2>
							<h6 v-if="product.attributes.subtitle">
								{{ product.attributes.subtitle }}
							</h6>
						</hgroup>
					</div>
				</SwiperSlide>
			</Swiper>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRouter } from "vue-router";
import { parse } from "marked";
import SplitContent from "@/components/SplitContent/SplitContent.vue";
import { strapi, strapiMedia } from "@/lib/services";
import { throwContentError } from "@/lib/utils";

const router = useRouter();

const productClick = (ev: MouseEvent) => {
	ev.preventDefault();

	const href = (ev.currentTarget as HTMLAnchorElement)
		.getAttribute("href")!;

	void router.push(href);
};

const page = await strapi.getWorkPage()
	.catch(throwContentError);

</script>

<style scoped src="./Work.scss" />