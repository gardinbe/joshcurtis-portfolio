<template>
	<!-- handle route level 1 `/a` -->
	<RouterView v-slot="{ Component: ComponentA }">
		<main :inert="level > 1">
			<AsyncComponent :component="ComponentA" />
		</main>

		<!-- TODO: this panel routing solution is scuffed -->
		<!-- handle route level 2 `/a/b` -->
		<RouterView
			v-if="$route.matched.some(route => route.name === 'home')"
			v-slot="{ Component: ComponentB }"
		>
			<Panel
				:open="!!ComponentB"
				:close-action="routeTo('/')"
				:inert="level > 2"
			>
				<AsyncComponent :component="ComponentB" />
			</Panel>

			<!-- handle route level 3 `/a/b/c` -->
			<RouterView v-slot="{ Component: ComponentC }">
				<Panel
					:open="!!ComponentC"
					:close-action="routeTo(
						$route.path.slice(0, $route.path.lastIndexOf('/')) || '/'
					)"
					keep-overflow-hidden-on-close
				>
					<AsyncComponent :component="ComponentC" />
				</Panel>
			</RouterView>
		</RouterView>
	</RouterView>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
import Panel from "@/components/Panel/Panel.vue";
import AsyncComponent from "@/components/AsyncComponent/AsyncComponent.vue";

const router = useRouter();

const level = computed(() =>
	router.currentRoute.value.matched.length);

const routeTo = (path: string) =>
	() => {
		void router.push(path);
	};

</script>