import { CollectionItem, CollectionResponse, ImageData, Item, PublishableItemData, SingleResponse } from "@/types/api/strapi";

export type ProductResponse = SingleResponse<Product>;
export type ProductsResponse = CollectionResponse<Product>;

export type Product = {
	title: string;
	subtitle: string | null;
	content: string;
	link: string;
	image: Item<ImageData>;
	tags: CollectionItem<PublishableItemData<ProductTag>>;
};

type ProductTag = {
	name: string;
	color: string;
};
