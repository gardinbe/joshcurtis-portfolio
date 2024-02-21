import { Collection, PublishableItem } from "~/lib/types/strapi";
import { SocialLink } from "~/lib/types/strapi-data/collection-items";
import { Meta } from "~/lib/types/strapi-data/components";

export interface ContactPage extends PublishableItem<{
	meta: Meta;
	title: string;
	content: string;
	social_links: Collection<SocialLink>;
}> { }