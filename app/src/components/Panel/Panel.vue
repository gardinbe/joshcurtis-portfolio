<template>
	<Transition>
		<div
			v-if="open"
			class="panel-container"
			:inert="!!inert"
		>
			<div
				ref="panelBackdropElmt"
				class="panel-backdrop"
				@click.passive="backdropClick"
				@touchstart.passive="backdropTouchStart"
				@touchmove.passive="backdropTouchMove"
				@touchend.passive="backdropTouchEnd"
			/>

			<div
				ref="panelElmt"
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
	/** Whether the panel should be open or not. */
	open: boolean;
	/**
	 * The function to execute for when the panel should be closed.
	 *
	 * **This must inherently set `open` to false.**
	 */
	closeAction: () => void;
	/** Whether to keep body overflow hidden when the panel closes. */
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
	if ((ev.key !== "Escape" && ev.key !== "Esc") || props.inert)
		return;

	props.closeAction();
};

onMounted(() => {
	document.addEventListener("keydown", closeOnEscapeKey, { passive: true });
});

onUnmounted(() => {
	document.removeEventListener("keydown", closeOnEscapeKey);
});

const panelElmt = ref<HTMLElement | null>(null);
const panelBackdropElmt = ref<HTMLElement | null>(null);

const backdropClick = (ev: MouseEvent) => {
	if (ev.currentTarget !== panelBackdropElmt.value)
		return;

	props.closeAction();
};

/**
 * The starting left distance from the panel's bounding client
 * rectangle.
 */
let panelPosX: number | null = null;

/**
 * The horizontal distance travelled by the swipe from the
 * starting horizontal position of the panel, `startPosX`.
 *
 * Negative if travelled backwards, positive if forwards.
 */
let swipeDistance: number | null = null;

/**
 * Threshold duration for a fast swipe (in milliseconds).
 */
const FAST_SWIPE_THRESHOLD = 250;

let swipeStartTime: number | null = null;

const backdropTouchStart = () => {
	if (!panelElmt.value)
		return;

	swipeStartTime = Date.now();
	panelPosX = panelElmt.value.getBoundingClientRect().left;
};

const backdropTouchMove = (ev: TouchEvent) => {
	if (!panelElmt.value || panelPosX === null)
		return;

	const posX = ev.touches[0]!.clientX;
	swipeDistance = posX - panelPosX;

	//dont go backwards
	if (swipeDistance <= 0)
		return;

	panelElmt.value.style.transition = "unset";
	panelElmt.value.style.transform = `translateX(${swipeDistance}px)`;
};

const backdropTouchEnd = () => {
	if (
		!panelElmt.value
		|| swipeDistance === null
		|| swipeStartTime === null
	)
		return;

	const elapsed = Date.now() - swipeStartTime;
	const fastSwipe = elapsed < FAST_SWIPE_THRESHOLD;

	panelElmt.value.style.transition = "";
	panelElmt.value.style.transform = "";

	if (
		swipeDistance > panelElmt.value.clientWidth / 2
		|| (fastSwipe && swipeDistance > 0)
	)
		props.closeAction();

	panelPosX = null;
	swipeDistance = null;
};

</script>

<style scoped src="./Panel.scss" />