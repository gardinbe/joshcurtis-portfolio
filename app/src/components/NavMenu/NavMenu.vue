<template>
	<div
		ref="menuEl"
		class="navMenu"
	>
		<button
			ref="btnEl"
			class="navMenu__btn"
			aria-label="Toggle menu"
			@click.passive="toggle"
		>
			<span class="bar" />
			<span class="bar" />
			<span class="bar" />
		</button>
		<menu
			ref="itemsEl"
			class="navMenu__items"
		>
			<li
				v-for="item of items"
				:key="item.link"
			>
				<RouterLink
					:to="item.link"
					aria-label="Open page"
					@click.passive="close"
				>
					{{ item.label }}
				</RouterLink>
			</li>
		</menu>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

export interface NavItem {
	label: string;
	link: string;
}

defineProps<{
	items: NavItem[];
}>();

const menuEl = ref<HTMLElement | null>(null);
const btnEl = ref<HTMLElement | null>(null);
const itemsEl = ref<HTMLElement | null>(null);

onMounted(() => {
	btnEl.value!.dataset.visible = "false";
});

onUnmounted(() => {
	removeEventListener("click", handleWindowClick);
});

let opened = false;

const toggle = () => opened
	? close()
	: open();

const open = () => {
	btnEl.value!.dataset.visible = "true";
	addEventListener("click", handleWindowClick, { passive: true });
	opened = true;
};

const close = () => {
	btnEl.value!.dataset.visible = "false";
	removeEventListener("click", handleWindowClick);
	opened = false;
};

const handleWindowClick = (ev: MouseEvent) => {
	const target = ev.target as HTMLElement;
	if (menuEl.value!.contains(target))
		return;

	close();
};

</script>

<style scoped src="./NavMenu.scss" />