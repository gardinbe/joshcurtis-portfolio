<template>
	<div class="navMenu">
		<button
			ref="navMenuBtnElmt"
			class="navMenu__btn"
			@click.passive="toggle"
		>
			<span class="bar" />
			<span class="bar" />
			<span class="bar" />
		</button>
		<menu
			ref="navMenuElmt"
			class="navMenu__items"
		>
			<li
				v-for="item of items"
				:key="item.link"
			>
				<RouterLink
					:to="item.link"
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

const navMenuBtnElmt = ref<HTMLElement | null>(null);
const navMenuElmt = ref<HTMLElement | null>(null);

let opened = false;

const toggle = () => opened
	? close()
	: open();

onMounted(() => {
	navMenuBtnElmt.value!.dataset.visible = "false";
});

onUnmounted(() => {
	removeEventListener("click", closeWhenClickingOff);
});

const open = () => {
	navMenuBtnElmt.value!.dataset.visible = "true";
	setTimeout(() =>
		addEventListener("click", closeWhenClickingOff, { passive: true })
		, 0);
	opened = true;
};

const close = () => {
	navMenuBtnElmt.value!.dataset.visible = "false";
	removeEventListener("click", closeWhenClickingOff);
	opened = false;
};

const closeWhenClickingOff = (ev: MouseEvent) => {
	const target = ev.target as HTMLElement;
	if (navMenuElmt.value!.contains(target))
		return;

	close();
};

</script>

<style scoped src="./NavMenu.scss" />