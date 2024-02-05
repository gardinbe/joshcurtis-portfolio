<template>
	<template v-if="type === 'picture'">
		<picture :style="{ backgroundColor: _fallbackColor }">
			<source
				v-if="pictureSources[0]"
				:media="sourceMediaQuery(pictureSources[0].breakpoint.max ?? 1600)"
				:srcset="strapiMedia.url(image.attributes.url)"
				:width="image.attributes.width"
				:height="image.attributes.height"
			>
			<source
				v-for="source of pictureSources"
				:key="source.format.width"
				:media="sourceMediaQuery(source.breakpoint.min)"
				:srcset="strapiMedia.url(source.format.url)"
				:width="source.format.width"
				:height="source.format.height"
			>
			<img
				:src="strapiMedia.url(image.attributes.url)"
				:alt="image.attributes.alternativeText ?? undefined"
				:width="image.attributes.width"
				:height="image.attributes.height"
				:loading="eager ? 'eager' : 'lazy'"
			>
		</picture>
	</template>
	<template v-else-if="type === 'img'">
		<img
			:style="{ backgroundColor: _fallbackColor }"
			:src="strapiMedia.url(imgFormat.url)"
			:alt="image.attributes.alternativeText ?? undefined"
			:width="imgFormat.width"
			:height="imgFormat.height"
			:loading="eager ? 'eager' : 'lazy'"
		>
	</template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Image, ImageFormat, ImageFormatName } from "@/lib/types/strapi";
import { strapiMedia } from "@/lib/services";
import { BSBreakpoint, bsBreakpoints } from "@/lib/utils";

const props = defineProps<{
	/** The type of image. */
	type: "picture" | "img";
	/** The Strapi image data. */
	image: Image;
	/**
	 * The target image format name.
	 *
	 * If format does not exist, the next largest available format will
	 * be selected.
	 *
	 * ***Note***: This is only applicable when `type` is set to `img`.
	 * @defaultValue "medium"
	 */
	targetFormat?: ImageFormatName;
	/**
	 * The breakpoint scaling factor for the image.
	 *
	 * The scaling factor is used as a multiplier applied to Bootstrap's
	 * breakpoints:
	 *
	 * | Strapi image format name - | BS breakpoint name - | BS breakpoint min-width |
	 * | -------------------------- | -------------------- | ----------------------- |
	 * | *small*                    | xs                   | 0px                     |
	 * | *medium*                   | sm                   | 576px                   |
	 * | *large*                    | md                   | 768px                   |
	 * | *xlarge*                   | lg                   | 992px                   |
	 * | *(source image)*           | (none)               | (none)                  |
	 *
	 * So the default scaling factor of `1` would map the default formats
	 * of a Strapi image 1:1 with the Bootstrap min-width breakpoints as per
	 * the table shown above.
	 *
	 * This means if the image needs to be rendered at a large size and takes
	 * up most of the viewport, this scaling factor should be **decreased**,
	 * so the min-widths will be *lower* for higher quality formats, and
	 * vice-versa.
	 *
	 * ***Note***: This is only applicable when `type` is set to `picture`.
	 * @defaultValue 1
	 */
	breakpointScaling?: number;
	/**
	 * Whether or not the image should load eagerly.
	 *
	 * *All images are lazy-loaded by default.*
	 */
	eager?: boolean;
	/**
	 * Whether or not the image should ***not*** use the fallback background
	 * color.
	 */
	noFallbackColor?: boolean;
}>();

const _fallbackColor = computed(() =>
	!props.noFallbackColor
		? strapiMedia.fallbackColor ?? undefined
		: undefined);

const _breakpointScaling = computed(() =>
	props.breakpointScaling ?? 1);

/**
 * Object of Strapi image format names mapped against Bootstrap
 * breakpoints.
 */
const breakpoints: Partial<Record<ImageFormatName, BSBreakpoint>> = {
	small: bsBreakpoints.XS,
	medium: bsBreakpoints.SM,
	large: bsBreakpoints.MD,
	xlarge: bsBreakpoints.LG
};

interface PictureSource {
	format: ImageFormat;
	breakpoint: BSBreakpoint;
}

const pictureSources = computed(() =>
	(Object.entries(breakpoints))
		.map(
			([name, breakpoint]) => ({
				format: props.image.attributes.formats[name as ImageFormatName],
				breakpoint
			})
		)
		.filter(
			(source): source is PictureSource => !!source.format
		)
		.sort(
			(a, b) => b.format.width - a.format.width
		));

const sourceMediaQuery = (minWidth: number) =>
	`(min-width: ${minWidth * _breakpointScaling.value}px)`;

const imgFormat = computed(() =>
	strapiMedia.getImageFormat(
		props.image,
		props.targetFormat ?? "medium"
	));

</script>

<style scoped src="./StrapiImage.scss" />