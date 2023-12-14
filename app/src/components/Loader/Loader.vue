<template>
	<section
		class="loader-wrapper"
		:class="{ inline, fixed }"
	>
		<Transition
			appear
			name="fade-slow-in"
		>
			<div class="loader">
				<span>{</span>
				<span>}</span>
			</div>
		</Transition>
	</section>
</template>

<script setup lang="ts">

export type LoaderProps = {
	inline?: boolean;
	fixed?: boolean;
};

defineProps<LoaderProps>();

</script>

<style scoped src="./Loader.scss" />