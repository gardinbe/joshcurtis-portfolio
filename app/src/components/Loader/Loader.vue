<template>
	<div class="loader-wrapper">
		<Transition
			appear
			name="fade-in"
		>
			<div class="loader">
				<span>{</span>
				<span>}</span>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped src="./Loader.scss" />