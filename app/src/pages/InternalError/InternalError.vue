<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/no-v-html -->
<template>
	<main class="internal-error">
		<hgroup>
			<h1>Internal application error</h1>
		</hgroup>
		<p>
			The application has ran into an internal error. Please try again later, or
			<span>
				<RouterLink
					to="/"
					v-html="'return to the homepage'"
				/>
			</span>
			here.
		</p>
	</main>
</template>

<script setup lang="ts"></script>

<style scoped src="./InternalError.scss" />