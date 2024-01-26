<template>
	<img
		:class="{ 'no-fallback-color': noFallbackColor }"
		:src="strapi.mediaUrl(format?.url)"
		:width="format?.width"
		:height="format?.height"
		:alt="image.attributes.alternativeText ?? undefined"
		:loading="lazy === true ? 'lazy' : undefined"
	>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { strapi } from "@/utils";
import { ImageData } from "@/types/api/strapi";

const props = defineProps<{
	image: ImageData;
	format: keyof ImageData["attributes"]["formats"];
	lazy?: boolean;
	noFallbackColor?: boolean;
}>();

const format = computed(() => props.image.attributes.formats[props.format]);

</script>

<style scoped src="./StrapiImage.scss" />