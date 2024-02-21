import { Collection } from "~/lib/types/strapi";
import { Product } from "~/lib/types/strapi-data/collection-items";
import { Meta } from "~/lib/types/strapi-data/components";
import { PublishableItem } from "~/lib/types/strapi/item";

export interface WorkPage extends PublishableItem<{
	meta: Meta;
	title: string;
	content: string;
	products: Collection<Product>;
}> { }