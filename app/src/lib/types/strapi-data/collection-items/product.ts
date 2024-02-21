import { PublishableItem, Single, Image, Collection } from "~/lib/types/strapi";
import { ProductTag } from "~/lib/types/strapi-data/collection-items";
import { Meta } from "~/lib/types/strapi-data/components";

export interface Product extends PublishableItem<{
	meta: Meta;
	title: string;
	slug: string;
	subtitle?: string;
	content: string;
	link: string;
	image: Single<Image>;
	tags: Collection<ProductTag>;
}> { }