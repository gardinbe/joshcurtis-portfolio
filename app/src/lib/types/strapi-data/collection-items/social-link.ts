import { Image, Single } from "~/lib/types/strapi";
import { PublishableItem } from "~/lib/types/strapi/item";

export interface SocialLink extends PublishableItem<{
	name: string;
	url: string;
	icon: Single<Image>;
	background_color: string;
}> { }