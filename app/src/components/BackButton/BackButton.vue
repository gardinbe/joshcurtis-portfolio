<template>
	<RouterLink
		class="back-btn"
		aria-label="Go back"
		:to="$route.path.slice(0, $route.path.lastIndexOf('/')) || '/'"
	>
		<FontAwesomeIcon icon="fa-solid fa-arrow-left" />
	</RouterLink>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

</script>

<style scoped src="./BackButton.scss" />