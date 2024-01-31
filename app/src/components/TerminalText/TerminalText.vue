<template>
	<div
		ref="terminalTextElmt"
		class="terminal-text"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TerminalText } from "@/lib/utils";

const props = defineProps<{
	/**
	 * Whether or not to predetermine the minimum height of an element.
	 *
	 * If a `[[minHeight]]` keyword is used, then this will be where this height is
	 * determined.
	 *
	 * This stops the element from slowing increasing in height over time, as
	 * more characters are added.
	 */
	predetermineHeight?: boolean;
}>();

const terminalTextElmt = ref<HTMLElement | null>(null);

onMounted(async () => {
	if (!terminalTextElmt.value)
		throw new Error("Missing terminal text element");

	await new TerminalText(terminalTextElmt.value, props)
		.start();
});

</script>

<style scoped src="./TerminalText.scss" />