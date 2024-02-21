<template>
	<template v-if="type === 'router-link'">
		<RouterLink
			class="btn"
			:class="{
				'btn--lg': size === 'large',
				'btn--filled': mode === 'filled',
				'btn--filled-dark': mode === 'filled-dark',
				'btn--ghost': mode === 'ghost'
			}"
			:to="href ?? ''"
			:aria-label="ariaLabel"
		>
			<slot />
		</RouterLink>
	</template>
	<template v-else-if="type === 'anchor'">
		<a
			type="button"
			class="btn"
			:class="{
				'btn--lg': size === 'large',
				'btn--filled': mode === 'filled',
				'btn--filled-dark': mode === 'filled-dark',
				'btn--ghost': mode === 'ghost'
			}"
			:href="href ?? ''"
			target="_blank"
			:aria-label="ariaLabel ?? ''"
		>
			<slot />
		</a>
	</template>
	<template v-else-if="type === 'button'">
		<button
			type="button"
			class="btn"
			:class="{
				'btn--lg': size === 'large',
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
	type: "router-link" | "anchor" | "button";
	mode: "filled" | "filled-dark" | "ghost";
	size?: "normal" | "large";
	href?: string;
	ariaLabel?: string;
}>();

</script>

<style scoped src="./Button.scss" />