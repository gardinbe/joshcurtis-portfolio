<template>
	<Transition
		v-if="initialDelayFinished"
		name="fade"
	>
		<div
			v-if="open"
			class="panel-backdrop"
			@click="closeAction"
			@touchstart="touchStartHandler"
			@touchmove="ev => touchMoveHandler(ev.touches[0]!.clientX)"
			@touchend="touchEndHandler"
		/>
	</Transition>

	<Transition
		v-if="initialDelayFinished"
		name="slide-in-from-right"
	>
		<div
			v-if="open"
			ref="panelElRef"
			class="panel"
		>
			<slot />
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { delay } from "@/utils";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{
	open: boolean;
	keepOverflowHiddenOnClose?: boolean;
	closeAction: () => void;
}>();

const panelOpenListener = () => {
	if (props.open || props.keepOverflowHiddenOnClose)
		document.body.style.overflow = "hidden";
	else
		document.body.style.overflow = "";
};

onMounted(panelOpenListener);
watch(computed(() => props.open), panelOpenListener);

/**
 * Delay timer exists to stop Transition playing half an animation on page load.
 */
const initialDelayFinished = ref(false);
void delay(0).then(() => initialDelayFinished.value = true);

/**
 * Close panel on ESC keypress.
 */
document.addEventListener("keydown", ev => {
	if (ev.key !== "Escape" && ev.key !== "Esc")
		return;
	props.closeAction();
});

const panelElRef = ref<HTMLElement | null>(null);

/**
 * The position of the most recent Touch event, relative to the panel's
 * currently set starting position. Negative if backwards, positive if forwards.
 */
let panelDistanceTravelled: number | null = null;
let panelStartingPosX: number | null = null;

const shortSwipe = {
	/** Threshold time in milliseconds to check if this is a shortswipe. */
	threshold: 250,
	startTime: 0,
	startPos: 0,
	elapsed: 0,
	isShortSwipe: false,
	startTimer() {
		this.startTime = Date.now();
	},
	stopTimer() {
		this.elapsed = Date.now() - this.startTime;
		this.isShortSwipe = this.elapsed <= this.threshold
			&& panelDistanceTravelled !== null
			&& panelDistanceTravelled > 0;
	}
};

/**
 * Set the starting position of the panel.
 */
const touchStartHandler = () => {
	shortSwipe.startTimer();
	panelStartingPosX = panelElRef.value?.getBoundingClientRect().left ?? 0;
};

/**
 * Attempt to slide the panel relative to `posX`.
 * @param posX X position of TouchEvent
 */
const touchMoveHandler = (posX: number) => {
	if (panelElRef.value === null || panelStartingPosX === null)
		return;

	panelDistanceTravelled = posX - panelStartingPosX;

	//dont go backwards
	if (panelDistanceTravelled < 0)
		return;

	//remove transition delay and set transform
	panelElRef.value.style.transition = "unset";
	panelElRef.value.style.transform = `translateX(${panelDistanceTravelled}px)`;
};

/**
 * Check to see if the panel should remain open or if the panel should
 * be closed after `touchend` event is fired.
 */
const touchEndHandler = () => {
	if (panelElRef.value === null || panelDistanceTravelled === null)
		return;

	shortSwipe.stopTimer();
	panelStartingPosX = null;

	//readd transition delay and unset transform
	panelElRef.value.style.transition = "";
	panelElRef.value.style.transform = "";

	if (
		//if shortswipe is over the threshold
		!shortSwipe.isShortSwipe
		//if less than halfway dragged
		&& panelDistanceTravelled < panelElRef.value.clientWidth / 2
	)
		return;

	//close panel
	panelDistanceTravelled = null;
	props.closeAction();
};

</script>

<style scoped src="./Panel.scss" />