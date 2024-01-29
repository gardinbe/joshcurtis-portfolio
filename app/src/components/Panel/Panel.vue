<template>
	<Transition name="fade">
		<div
			v-if="openIf"
			class="panel-backdrop"
			@click="close"
			@touchstart="touchStartHandler"
			@touchmove="ev => touchMoveHandler(ev.touches[0]!.clientX)"
			@touchend="touchEndHandler"
		/>
	</Transition>

	<Transition name="slide-in-from-right">
		<div
			v-if="openIf"
			ref="panelElRef"
			class="panel"
			:inert="inert"
		>
			<slot />
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{
	inert?: boolean;
	//TODO -> this smells. would prefer `v-if` on parent, but multiple transitions...
	//and even if nesting classes in transition, more problems arise...
	openIf: boolean;
	close: () => void;
	keepOverflowHiddenOnClose?: boolean;
}>();

const updateOverflow = () => {
	document.body.style.overflow = props.openIf
		? "hidden"
		: props.keepOverflowHiddenOnClose
			? "hidden"
			: "";
};

onMounted(updateOverflow);
watch(computed(() => props.openIf), updateOverflow);


/**
 * Close panel on ESC keypress.
 */
document.addEventListener("keydown", ev => {
	if ((ev.key !== "Escape" && ev.key !== "Esc") || props.inert)
		return;
	props.close();
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
 * @param posX - X position of TouchEvent
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
	props.close();
};

</script>

<style scoped src="./Panel.scss" />