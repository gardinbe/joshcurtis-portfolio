<!-- eslint-disable vue/no-v-html -->
<template>
	<SplitContent
		second-slot-type="swiper"
		class="work"
		has-back-btn
	>
		<template #first>
			<div class="work__main-content">
				<hgroup>
					<h1>{{ page.attributes.title }}</h1>
				</hgroup>

				<div v-html="parse(page.attributes.content)" />
			</div>
		</template>

		<template #second>
			<Swiper
				class="products"
				:speed="150"
				:space-between="16"
				:centered-slides="true"
				:navigation="true"
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
					class="product"
					:aria-label="product.attributes.title"
					:style="strapiMedia.createBackground(
						product.attributes.image.data,
						'large'
					)"
					@click="handleProductClick(product.attributes.slug)"
					@touchstart="ev => handleProductTouchStart(ev.touches[0]!)"
					@touchmove="ev => handleProductTouchMove(ev.touches[0]!)"
					@touchend="ev => handleProductTouchEnd(ev, product.attributes.slug)"
				>
					<div class="product__overlay">
						<hgroup>
							<h2>{{ product.attributes.title }}</h2>
							<h6>{{ product.attributes.subtitle }}</h6>
						</hgroup>
					</div>
				</SwiperSlide>
			</Swiper>
		</template>
	</SplitContent>

	<Panel
		:open="panelOpen"
		:close-action="closePanel"
		keep-overflow-hidden-on-close
	>
		<RouterView v-slot="{ Component }">
			<AsyncComponentLoader :component="Component" />
		</RouterView>
	</Panel>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { SwiperContainer } from "swiper/element";
import { parse } from "marked";
import Panel from "@/components/Panel/Panel.vue";
import SplitContent from "@/components/SplitContent/SplitContent.vue";
import AsyncComponentLoader from "@/components/AsyncComponentLoader/AsyncComponentLoader.vue";
import { strapi, strapiMedia } from "@/lib/services";

const router = useRouter();

const productSlider = computed(() =>
	document.querySelector<SwiperContainer>(".products.swiper"));

const panelOpen = ref(router.currentRoute.value.name === "Product");
router.beforeEach(to => { panelOpen.value = to.name === "Product"; });

const closePanel = () => {
	const matched = router.currentRoute.value.matched;
	void router.push(matched[matched.length - 2]?.path ?? "/");
	panelOpen.value = false; //not strictly necessary
};

/**
 * Handle clicking on a product, and disable the click event when on mobile.
 * @param slug - Target product slug
 */
const handleProductClick = (slug: string) => {
	if (matchMedia("(pointer: coarse)").matches)
		return;

	void router.push(`${router.currentRoute.value.path}/${slug}`);
};

type Position = { x: number; y: number; };

let firstProductTouchPos: Position | null = null;
let lastProductTouchPos: Position | null = null;

const handleProductTouchStart = (touch: Touch) => {
	firstProductTouchPos = {
		x: touch.clientX,
		y: touch.clientY
	};
	lastProductTouchPos = firstProductTouchPos;
};

const handleProductTouchMove = (touch: Touch) => {
	lastProductTouchPos = {
		x: touch.clientX,
		y: touch.clientY
	};
};

const productTapThreshold = 16;

/**
 * Hacky fix to replace a standard click event - there is a noticable delay
 * when trying to tap swiperjs slides on mobile...
 * @param slug - Target product slug
 */
const handleProductTouchEnd = (ev: TouchEvent, slug: string) => {
	if (
		productSlider.value?.swiper === undefined
		|| productSlider.value.swiper.animating
		|| firstProductTouchPos === null
		|| lastProductTouchPos === null
	)
		return;

	const firstPos = firstProductTouchPos;
	const lastPos = lastProductTouchPos;

	firstProductTouchPos = null;
	lastProductTouchPos = null;

	if (
		Math.abs(firstPos.x - lastPos.x) > productTapThreshold
		|| Math.abs(firstPos.y - lastPos.y) > productTapThreshold
	)
		return;

	ev.preventDefault(); //important!

	void router.push(`${router.currentRoute.value.path}/${slug}`);
};

const page = await strapi.getWorkPage();

</script>

<style scoped src="./Work.scss" />