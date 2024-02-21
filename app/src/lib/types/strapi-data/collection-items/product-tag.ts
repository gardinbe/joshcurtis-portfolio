import { PublishableItem } from "~/lib/types/strapi/item";

export interface ProductTag extends PublishableItem<{
	name: string;
	color: string;
}> { }