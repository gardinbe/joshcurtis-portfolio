<template>
	<div class="content">
		<hgroup>
			<h1>Page not found</h1>
		</hgroup>
		<p>
			The page or content you are for does not exist or has been removed.
		</p>
		<p>
			Please
			<RouterLink
				to="/"
				aria-label="Return to homepage"
				v-html="'return to the homepage'"
			/>, or try again later.
		</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped src="./NotFound.scss" />