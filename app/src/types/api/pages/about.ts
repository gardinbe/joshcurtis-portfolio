import { BaseItemData, ImageData, Item, SingleResponse } from "@/types/api/strapi";

export type AboutResponse = SingleResponse<AboutData>;

export type AboutData = {
	title: string;
	content: string;
	info_blocks: BaseItemData<InfoBlock>[]; //repeated component
	image: Item<ImageData>;
};

type InfoBlock = {
	title: string;
	content: string;
};