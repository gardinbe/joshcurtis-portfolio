import { Image, PublishableItem, RepeatedComponent, Single } from "~/lib/types/strapi";
import { InfoBlock, Meta } from "~/lib/types/strapi-data/components";

export interface AboutPage extends PublishableItem<{
	meta: Meta;
	title: string;
	content: string;
	info_blocks: RepeatedComponent<InfoBlock>;
	image: Single<Image>;
}> { }

