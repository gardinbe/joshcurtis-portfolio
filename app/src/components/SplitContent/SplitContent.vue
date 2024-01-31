<template>
	<section
		class="split-content"
		:class="{
			'split-content--evenly-sized': sizing === 'evenly-sized',
			'split-content--enlarge-first': sizing === 'enlarge-first',
			'split-content--enlarge-second': sizing === 'enlarge-second'
		}"
	>
		<div class="first">
			<template v-if="hasButton">
				<div
					v-if="$slots.button"
					class="split-content__btn"
				>
					<slot name="button" />
				</div>
				<BackButton
					v-else
					class="split-content__btn"
				/>
			</template>

			<div class="first__content">
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
	secondSlotType: "image" | "swiper";
	sizing: "evenly-sized" | "enlarge-first" | "enlarge-second";
	hasButton?: boolean;
}>();

</script>

<style scoped src="./SplitContent.scss" />