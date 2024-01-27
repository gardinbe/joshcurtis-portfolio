import { Image, PublishableItem, RepeatedComponent, Single } from "@/lib/types/strapi";
import { InfoBlock } from "@/lib/types/strapi-data/components";

export interface AboutPage extends PublishableItem<{
	title: string;
	content: string;
	info_blocks: RepeatedComponent<InfoBlock>;
	image: Single<Image>;
}> { }

