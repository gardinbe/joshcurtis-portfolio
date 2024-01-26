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
						<h1>{{ data.title }}</h1>
					</hgroup>

					<p>{{ data.content }}</p>
				</div>

				<div
					v-if="data.info_blocks.length > 0"
					class="about__info-blocks"
				>
					<div
						v-for="infoBlock of data.info_blocks"
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
				:image="data.image.data"
				format="large"
				lazy
			/>
		</template>
	</SplitContent>
</template>

<script setup lang="ts">
import SplitContent from "@/components/sections/SplitContent/SplitContent.vue";
import StrapiImage from "@/components/StrapiImage/StrapiImage.vue";
import { AboutResponse } from "@/types/api/pages/about";
import { strapi } from "@/utils";
import { parse } from "marked";

const response = await strapi.get<AboutResponse>("about");
const data = response.data.attributes;

</script>

<style scoped src="./About.scss" />