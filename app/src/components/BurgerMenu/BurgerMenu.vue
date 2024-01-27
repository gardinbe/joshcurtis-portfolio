<template>
	<div class="burger">
		<div
			ref="burgerBtn"
			class="burger__btn"
			@click="toggle"
		>
			<span class="bar" />
			<span class="bar" />
			<span class="bar" />
		</div>
		<menu
			ref="burgerMenu"
			class="burger__menu"
		>
			<li
				v-for="item of items"
				:key="item.label"
			>
				<RouterLink
					:to="item.href"
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

defineProps<{
	items: {
		label: string;
		href: string;
	}[];
}>();

const burgerBtn = ref<HTMLElement | null>(null);
const burgerMenu = ref<HTMLElement | null>(null);
let opened = false;

const toggle = () => opened ? close() : open();

onMounted(() => {
	if (burgerBtn.value === null)
		return;

	burgerBtn.value.dataset.visible = "false";
});

const open = () => {
	if (burgerBtn.value === null)
		return;
	burgerBtn.value.dataset.visible = "true";
	setTimeout(() => addEventListener("click", closeWhenClickingOff), 0);
	opened = true;
};

const close = () => {
	if (burgerBtn.value === null)
		return;
	burgerBtn.value.dataset.visible = "false";
	removeEventListener("click", closeWhenClickingOff);
	opened = false;
};

const closeWhenClickingOff = (ev: MouseEvent) => {
	const target = ev.target as HTMLElement;
	if (burgerMenu.value?.contains(target) === true)
		return;

	close();
};

</script>

<style scoped src="./BurgerMenu.scss" />