<template>
	<RouterView v-slot="{ Component }">
		<AsyncComponentLoader
			:component="Component"
			:loader-props="{ fixed: true }"
		/>
	</RouterView>
</template>

<script setup lang="ts">
import AsyncComponentLoader from "@/components/AsyncComponentLoader/AsyncComponentLoader.vue";
</script>

<style lang="scss">
@import "@/scss/main";
</style>

<style scoped src="./App.scss" />