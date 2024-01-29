<template>
	<template v-if="component">
		<Transition name="loader-fade-out">
			<KeepAlive>
				<Suspense>
					<!-- main content -->
					<component :is="component" />

					<!-- loading state -->
					<template #fallback>
						<Loader class="component-loader" />
					</template>
				</Suspense>
			</KeepAlive>
		</Transition>
	</template>
</template>

<script setup lang="ts">
import { VNode } from "vue";
import Loader from "@/components/Loader/Loader.vue";

defineProps<{
	component: VNode | undefined;
}>();

</script>

<style scoped src="./AsyncComponent.scss" />