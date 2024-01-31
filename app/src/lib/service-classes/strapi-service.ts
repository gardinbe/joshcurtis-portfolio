import { merge } from "lodash";
import { BaseStrapiService, BaseStrapiServiceOptions } from "@/lib/service-classes/base-strapi-service";
import { Product } from "@/lib/types/strapi-data/collection-items";
import { AboutPage, ContactPage, HomePage, WorkPage } from "@/lib/types/strapi-data/single-items";
import { OptionalProps } from "@/lib/types/utils";

/**
 * Options for a Strapi service.
 */
export interface StrapiServiceOptions extends BaseStrapiServiceOptions { }

/**
 * A service for handling and performing specific requests to the
 * Portfolio Strapi API.
 */
export class StrapiService extends BaseStrapiService {
	static override readonly defaultOptions: Required<OptionalProps<
		StrapiServiceOptions
	>> = merge({}, BaseStrapiService.defaultOptions);

	protected override readonly options: Required<StrapiServiceOptions>;

	/**
	 * Creates a new Strapi service instance.
	 * @param options - Portfolio Strapi service options
	 */
	constructor(options: StrapiServiceOptions) {
		const _options = merge({}, BaseStrapiService.defaultOptions, options);
		super(_options);
		this.options = _options;
	}

	async getHomePage() {
		return this.getSingle<HomePage>("home");
	}

	async getContactPage() {
		return this.getSingle<ContactPage>("contact");
	}

	async getAboutPage() {
		return this.getSingle<AboutPage>("about");
	}

	async getWorkPage() {
		return this.getSingle<WorkPage>("work");
	}

	async getProducts() {
		return this.getCollection<Product>("products");
	}

	async getProduct(key: { id: string | number; } | { slug: string; }) {
		if ("id" in key)
			return this.getSingle<Product>(`products/${key.id}`);
		else if ("slug" in key)
			return this.getCollectionFirstItem<Product>("products", {
				filters: { slug: { $eq: key.slug } }
			});
		else
			throw new Error("Unknown key");
	}
}