import { Collection, PublishableItem } from "~/lib/types/strapi";
import { SocialLink } from "~/lib/types/strapi-data/collection-items";

export interface ContactPage extends PublishableItem<{
	title: string;
	content: string;
	social_links: Collection<SocialLink>;
}> { }