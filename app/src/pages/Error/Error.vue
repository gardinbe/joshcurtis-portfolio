<template>
	<div class="content">
		<hgroup>
			<h1>Internal application error</h1>
		</hgroup>
		<p>
			The application has unfortunately ran into an internal error.
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

<style scoped src="./Error.scss" />