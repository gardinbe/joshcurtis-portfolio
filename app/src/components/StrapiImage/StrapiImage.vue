<template>
	<img
		:src="strapiMedia.url(format.url)"
		:width="format.width"
		:height="format.height"
		:alt="image.attributes.alternativeText ?? ''"
		:loading="eager ? 'eager' : 'lazy'"
		:style="{ backgroundColor: _fallbackColor }"
	>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Image, ImageFormatName } from "@/lib/types/strapi";
import { strapiMedia } from "@/lib/services";

const props = defineProps<{
	image: Image;
	format: ImageFormatName;
	eager?: boolean;
	fallbackColor?: boolean;
}>();

const format = computed(() =>
	strapiMedia.getImageFormat(
		props.image,
		props.format
	));

const _fallbackColor = computed(() =>
	props.fallbackColor
		? strapiMedia.fallbackColor ?? undefined
		: undefined);

</script>

<style
	scoped
	src="./StrapiImage.scss"
/>
