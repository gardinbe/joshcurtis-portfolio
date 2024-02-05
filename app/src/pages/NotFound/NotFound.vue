<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="content">
		<hgroup>
			<h1>404</h1>
			<h3>Page not found</h3>
		</hgroup>
		<p>
			The page or content you are for does not exist, or has been removed.
			You can
			<RouterLink
				to="/"
				aria-label="Return to homepage"
				v-html="'return to the homepage'"
			/> here.
		</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped src="./NotFound.scss" />