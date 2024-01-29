import { SocialLink } from "@/lib/types/strapi-data/collection-items";
import { PublishableItem, MediaItem, Single, Collection, Image } from "@/lib/types/strapi";

export interface HomePage extends PublishableItem<{
	title: string;
	content: string;
	cta: string;
	image: Single<Image>;
	social_links: Collection<SocialLink>;
	resume: Single<MediaItem>;
}> { }