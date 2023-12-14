<template>
	<section
		class="split-content"
		:class="{ 'split-content--viewport-height': viewportHeight }"
	>
		<div class="first">
			<div class="first__content">
				<BackButton v-if="hasBackBtn" />
				<slot name="first" />
			</div>
		</div>
		<div
			class="second"
			:class="{
				'second--image': secondSlotType === 'image',
				'second--swiper': secondSlotType === 'swiper'
			}"
		>
			<slot name="second" />
		</div>
	</section>
</template>

<script setup lang="ts">
import BackButton from "@/components/BackButton/BackButton.vue";

defineProps<{
	viewportHeight?: boolean;
	secondSlotType: "image" | "swiper";
	hasBackBtn?: boolean;
}>();

</script>

<style scoped src="./SplitContent.scss" />