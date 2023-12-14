<template>
	<span
		ref="terminalTextElRef"
		class="terminal-text"
	>
		<slot />
	</span>
</template>

<script setup lang="ts">
import { TerminalText } from "@/utils";
import { onMounted, ref } from "vue";

const props = defineProps<{
	predeterminedHeight?: boolean;
}>();

const terminalTextElRef = ref<HTMLElement | null>(null);

onMounted(async () => {
	if (terminalTextElRef.value === null)
		throw new Error("Missing terminal text element reference");

	const terminalText = new TerminalText({ textElmt: terminalTextElRef.value });

	if (props.predeterminedHeight)
		await terminalText.setPredeterminedHeight();

	await terminalText.start();
});

</script>

<style scoped src="./TerminalText.scss" />