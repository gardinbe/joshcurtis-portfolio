import Strapi from "@/types/api/strapi";

export type SocialLink = {
	name: string;
	url: string;
	icon: Strapi.Item<Strapi.ImageData>;
	background_color: string;
};