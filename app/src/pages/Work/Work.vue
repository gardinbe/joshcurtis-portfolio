<template>
	<SplitContent
		second-slot="swiper"
		sizing="enlarge-second"
		has-button
	>
		<template #first>
			<hgroup>
				<h1>{{ page.attributes.title }}</h1>
			</hgroup>

			<div v-html="md(page.attributes.content)" />
		</template>

		<template #second>
			<Swiper
				tabindex="-1"
				:speed="150"
				:space-between="16"
				centered-slides
				:navigation="{
					prevEl: '.swiper-btn--prev',
					nextEl: '.swiper-btn--next'
				}"
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
							<p
								v-if="product.attributes.subtitle"
								class="subtitle"
							>
								{{ product.attributes.subtitle }}
							</p>
						</hgroup>
					</div>
				</SwiperSlide>
				<button class="swiper-btn swiper-btn--prev">
					<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
				</button>
				<button class="swiper-btn swiper-btn--next">
					<FontAwesomeIcon icon="fa-solid fa-chevron-right" />
				</button>
			</Swiper>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRouter } from "vue-router";
import SplitContent from "~/components/SplitContent/SplitContent.vue";
import { cms, strapiMedia } from "~/lib/services/instances";
import { md, throwContentError } from "~/lib/utils";

const router = useRouter();

const productClick = (ev: MouseEvent) => {
	ev.preventDefault();

	const href = (ev.currentTarget as HTMLAnchorElement)
		.getAttribute("href")!;

	void router.push(href);
};

const page = await cms.getWorkPage()
	.catch(throwContentError);

</script>

<style scoped src="./Work.scss" />