<template>
	<SplitContent
		second-slot="image"
		sizing="enlarge-first"
		has-button
	>
		<template #first>
			<hgroup>
				<h1>{{ page.attributes.title }}</h1>
			</hgroup>

			<p>{{ page.attributes.content }}</p>

			<div
				v-if="page.attributes.info_blocks.length > 0"
				class="info-blocks"
			>
				<div
					v-for="infoBlock of page.attributes.info_blocks"
					:key="infoBlock.id"
					class="info-block"
				>
					<h4>{{ infoBlock.title }}</h4>
					<div v-html="md(infoBlock.content)" />
				</div>
			</div>
		</template>

		<template #second>
			<StrapiImage
				type="picture"
				:image="page.attributes.image.data"
				eager
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import SplitContent from "~/components/SplitContent/SplitContent.vue";
import StrapiImage from "~/components/StrapiImage/StrapiImage.vue";
import { cms } from "~/lib/services/instances";
import { md, throwContentError } from "~/lib/utils";

const page = await cms.getAboutPage()
	.catch(throwContentError);

</script>

<style scoped src="./About.scss" />