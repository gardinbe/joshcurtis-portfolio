<template>
	<template v-if="component !== undefined">
		<Transition
			appear
			name="content-loaded"
		>
			<Suspense
				suspensible
				:timeout="0"
			>
				<div class="component">
					<component :is="component" />
				</div>
				<template #fallback>
					<Loader v-bind="loaderProps" />
				</template>
			</Suspense>
		</Transition>
	</template>
</template>

<script setup lang="ts">
import { VNode } from "vue";
import Loader, { LoaderProps } from "@/components/Loader/Loader.vue";

defineProps<{
	component: VNode | undefined;
	loaderProps?: LoaderProps;
}>();

</script>

<style scoped src="./AsyncComponentLoader.scss" />