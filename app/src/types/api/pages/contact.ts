import { SocialLink } from "@/types/api/collections/social-link";
import { CollectionItem, SingleResponse, StandardItemData } from "@/types/api/strapi";

export type ContactResponse = SingleResponse<ContactData>;

export type ContactData = {
	title: string;
	content: string;
	social_links: CollectionItem<StandardItemData<SocialLink>>;
};