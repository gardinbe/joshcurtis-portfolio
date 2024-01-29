<template>
	<section class="standard-content">
		<template v-if="hasButton">
			<div
				v-if="$slots.button"
				class="standard-content__btn"
			>
				<slot name="button" />
			</div>
			<BackButton
				v-else
				class="standard-content__btn"
			/>
		</template>

		<div class="standard-content__content">
			<slot />
		</div>
	</section>
</template>

<script setup lang="ts">
import BackButton from "@/components/BackButton/BackButton.vue";

defineProps<{
	hasButton?: boolean;
}>();

</script>

<style scoped src="./StandardContent.scss" />