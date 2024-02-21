import { Collection } from "~/lib/types/strapi";
import { Product } from "~/lib/types/strapi-data/collection-items";
import { PublishableItem } from "~/lib/types/strapi/item";

export interface WorkPage extends PublishableItem<{
	title: string;
	content: string;
	products: Collection<Product>;
}> { }