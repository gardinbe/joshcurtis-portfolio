import { SocialLink } from "@/types/api/collections/social-link";
import { CollectionItem, ImageData, Item, MediaData, SingleResponse, StandardItemData } from "@/types/api/strapi";

export type HomeResponse = SingleResponse<HomeData>;

export type HomeData = {
	title: string;
	content: string;
	cta: string;
	image: Item<ImageData>;
	social_links: CollectionItem<StandardItemData<SocialLink>>;
	resume: Item<MediaData>;
};

