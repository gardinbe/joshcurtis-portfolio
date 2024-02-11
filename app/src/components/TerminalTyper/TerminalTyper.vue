<template>
	<div
		ref="terminalTyperEl"
		class="terminal-typer"
	/>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TerminalTyper, TerminalTyperOptions } from "@/lib/utils";

const props = defineProps<TerminalTyperOptions>();

const terminalTyperEl = ref<HTMLElement | null>(null);

onMounted(() => {
	void new TerminalTyper(terminalTyperEl.value!, props as TerminalTyperOptions)
		.start();
});

</script>

<style scoped src="./TerminalTyper.scss" />