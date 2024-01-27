<template>
	<RouterView v-slot="{ Component }">
		<AsyncComponentLoader
			:component="Component"
			:loader-props="{ fixed: true }"
		/>
	</RouterView>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onErrorCaptured } from "vue";
import AsyncComponentLoader from "@/components/AsyncComponentLoader/AsyncComponentLoader.vue";

const router = useRouter();

onErrorCaptured(err => {
	void router.push({ name: "NotFound" });
	console.error(err);
	return false;
});
</script>

<style lang="scss">
@import "@/lib/scss/main";
</style>

<style scoped src="./App.scss" />