<!-- eslint-disable vue/no-v-html -->
<template>
	<SplitContent
		second-slot-type="image"
		class="about"
		has-back-btn
	>
		<template #first>
			<div class="about__content">
				<div class="about__main-content">
					<hgroup>
						<h1>{{ page.attributes.title }}</h1>
					</hgroup>

					<p>{{ page.attributes.content }}</p>
				</div>

				<div
					v-if="page.attributes.info_blocks.length > 0"
					class="about__info-blocks"
				>
					<div
						v-for="infoBlock of page.attributes.info_blocks"
						:key="infoBlock.id"
						class="info-block"
					>
						<h4>{{ infoBlock.title }}</h4>
						<div v-html="parse(infoBlock.content)" />
					</div>
				</div>
			</div>
		</template>

		<template #second>
			<StrapiImage
				:image="page.attributes.image.data"
				format="large"
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import { parse } from "marked";
import SplitContent from "@/components/SplitContent/SplitContent.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import { strapi } from "@/lib/services";

const page = await strapi.getAboutPage();

</script>

<style scoped src="./About.scss" />