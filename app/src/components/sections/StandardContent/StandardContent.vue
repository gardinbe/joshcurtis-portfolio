<template>
	<section class="standard-content">
		<BackButton v-if="hasBackBtn" />
		<slot />
	</section>
</template>

<script setup lang="ts">
import BackButton from "@/components/BackButton/BackButton.vue";

defineProps<{
	hasBackBtn?: boolean;
}>();
</script>

<style scoped src="./StandardContent.scss" />