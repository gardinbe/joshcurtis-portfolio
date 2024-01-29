<template>
	<div class="navMenu">
		<button
			ref="navMenuBtn"
			class="navMenu__btn"
			@click="toggle"
		>
			<span class="bar" />
			<span class="bar" />
			<span class="bar" />
		</button>
		<menu
			ref="navMenu"
			class="navMenu__items"
		>
			<li
				v-for="item of items"
				:key="item.link"
			>
				<RouterLink
					:to="item.link"
					@click="close"
				>
					{{ item.label }}
				</RouterLink>
			</li>
		</menu>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

export interface NavItem {
	label: string;
	link: string;
}

defineProps<{
	items: NavItem[];
}>();

const navMenuBtn = ref<HTMLElement | null>(null);
const navMenu = ref<HTMLElement | null>(null);
let opened = false;

const toggle = () => opened ? close() : open();

onMounted(() => {
	navMenuBtn.value!.dataset.visible = "false";
});

const open = () => {
	navMenuBtn.value!.dataset.visible = "true";
	setTimeout(() => addEventListener("click", closeWhenClickingOff), 0);
	opened = true;
};

const close = () => {
	navMenuBtn.value!.dataset.visible = "false";
	removeEventListener("click", closeWhenClickingOff);
	opened = false;
};

const closeWhenClickingOff = (ev: MouseEvent) => {
	const target = ev.target as HTMLElement;
	if (navMenu.value!.contains(target) === true)
		return;

	close();
};

</script>

<style scoped src="./NavMenu.scss" />