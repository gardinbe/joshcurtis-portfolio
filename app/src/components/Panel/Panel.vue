<template>
	<Transition>
		<div
			v-if="open"
			class="panel-container"
			:inert="!!inert"
		>
			<div
				ref="panelBackdropEl"
				class="panel-backdrop"
				@click.passive="backdropClick"
				@touchstart.passive="backdropTouchStart"
				@touchmove.passive="backdropTouchMove"
				@touchend.passive="backdropTouchEnd"
			/>

			<div
				ref="panelEl"
				class="panel"
			>
				<slot />
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
	/** Whether or not the panel should be open. */
	open: boolean;
	/**
	 * Function to execute for when the panel should be closed.
	 *
	 * **This must inherently set `open` to false**.
	 */
	closeAction: () => void;
	/** Keep body overflow hidden when the panel closes. */
	keepOverflowHiddenOnClose?: boolean;
	inert?: boolean;
}>();

const updateOverflow = () => {
	document.body.style.overflow = props.open
		? "hidden"
		: props.keepOverflowHiddenOnClose
			? "hidden"
			: "";
};

watch(computed(() => props.open), updateOverflow);

const closeOnEscapeKey = (ev: KeyboardEvent) => {
	if ((ev.key === "Escape" || ev.key === "Esc") && !props.inert)
		props.closeAction();
};

onMounted(() => {
	document.addEventListener("keydown", closeOnEscapeKey, { passive: true });
});

onUnmounted(() => {
	document.removeEventListener("keydown", closeOnEscapeKey);
});

const panelEl = ref<HTMLElement | null>(null);
const panelBackdropEl = ref<HTMLElement | null>(null);

const backdropClick = (ev: MouseEvent) => {
	if (ev.currentTarget === panelBackdropEl.value)
		props.closeAction();
};

/**
 * Starting left distance from the panel's bounding client
 * rectangle.
 */
let panelPosX: number | null = null;

/**
 * Horizontal distance traveled by the swipe from the
 * starting horizontal position of the panel, `startPosX`.
 *
 * Negative if traveled backwards, positive if forwards.
 */
let swipeDistance: number | null = null;

/**
 * Threshold duration for a fast swipe (in milliseconds).
 */
const FAST_SWIPE_THRESHOLD = 250;

let swipeStartTime: number | null = null;

const backdropTouchStart = () => {
	if (!panelEl.value)
		return;

	swipeStartTime = Date.now();
	panelPosX = panelEl.value.getBoundingClientRect().left;
};

const backdropTouchMove = (ev: TouchEvent) => {
	if (!panelEl.value || panelPosX === null)
		return;

	const posX = ev.touches[0]!.clientX;
	swipeDistance = posX - panelPosX;

	//don't go backwards
	if (swipeDistance <= 0)
		return;

	panelEl.value.style.transition = "unset";
	panelEl.value.style.transform = `translateX(${swipeDistance}px)`;
};

const backdropTouchEnd = () => {
	if (
		!panelEl.value
		|| swipeDistance === null
		|| swipeStartTime === null
	)
		return;

	const elapsed = Date.now() - swipeStartTime;
	const fastSwipe = elapsed < FAST_SWIPE_THRESHOLD;

	panelEl.value.style.transition = "";
	panelEl.value.style.transform = "";

	if (
		swipeDistance > panelEl.value.clientWidth / 2
		|| (fastSwipe && swipeDistance > 0)
	)
		props.closeAction();

	panelPosX = null;
	swipeDistance = null;
};

</script>

<style scoped src="./Panel.scss" />