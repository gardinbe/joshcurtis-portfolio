<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="content">
		<hgroup>
			<h1>Internal application error</h1>
		</hgroup>
		<p>
			The application has ran into an internal error. Please try again later, or
			<RouterLink
				to="/"
				v-html="'return to the homepage'"
			/> here.
		</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped src="./Error.scss" />