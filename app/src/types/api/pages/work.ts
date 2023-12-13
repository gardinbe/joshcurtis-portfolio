import { Product } from "@/types/api/pages/products";
import { CollectionItem, PublishableItemData, SingleResponse } from "@/types/api/strapi";

export type WorkResponse = SingleResponse<WorkData>;

export type WorkData = {
	title: string;
	content: string;
	products: CollectionItem<PublishableItemData<Product>>;
};