<template>
	<template v-if="href !== undefined">
		<a
			type="button"
			class="btn"
			:class="{
				'btn--large': size === 'large',
				'btn--filled': mode === 'filled',
				'btn--filled-dark': mode === 'filled-dark',
				'btn--ghost': mode === 'ghost'
			}"
			:href="href"
			target="_blank"
			:aria-label="ariaLabel ?? ''"
		>
			<slot />
		</a>
	</template>
	<template v-else>
		<button
			type="button"
			class="btn"
			:class="{
				'btn--large': size === 'large',
				'btn--filled': mode === 'filled',
				'btn--filled-dark': mode === 'filled-dark',
				'btn--ghost': mode === 'ghost'
			}"
			:aria-label="ariaLabel ?? ''"
		>
			<slot />
		</button>
	</template>
</template>

<script setup lang="ts">

defineProps<{
	size?: "normal" | "large";
	mode: "filled" | "filled-dark" | "ghost";
	ariaLabel?: string;
	href?: string;
}>();

</script>

<style scoped src="./Button.scss" />