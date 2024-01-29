import { PublishableItem, Single, Image, Collection } from "@/lib/types/strapi";
import { ProductTag } from "@/lib/types/strapi-data/collection-items";

export interface Product extends PublishableItem<{
	title: string;
	slug: string;
	subtitle: string | null;
	content: string;
	link: string;
	image: Single<Image>;
	tags: Collection<ProductTag>;
}> { }