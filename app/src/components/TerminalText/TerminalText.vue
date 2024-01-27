<template>
	<span
		ref="terminalTextElmt"
		class="terminal-text"
	>
		<slot />
	</span>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TerminalText } from "@/lib/utils";

const props = defineProps<{
	predetermineHeight?: boolean;
}>();

const terminalTextElmt = ref<HTMLElement | null>(null);

onMounted(async () => {
	if (terminalTextElmt.value === null)
		throw new Error("Missing terminal text element reference");

	await new TerminalText(terminalTextElmt.value).start({
		predetermineHeight: props.predetermineHeight
	});
});

</script>

<style scoped src="./TerminalText.scss" />