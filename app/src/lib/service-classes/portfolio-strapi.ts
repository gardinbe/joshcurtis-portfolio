import { merge } from "lodash";
import { StrapiService, StrapiServiceOptions } from "@/lib/service-classes/strapi";
import { Product } from "@/lib/types/strapi-data/collection-items";
import { AboutPage, ContactPage, HomePage, WorkPage } from "@/lib/types/strapi-data/single-items";
import { OptionalProps } from "@/lib/types/utils";

/**
 * Options for a portfolio Strapi service.
 */
export interface PortfolioStrapiServiceOptions extends StrapiServiceOptions { }

/**
 * A service for handling and performing specific requests to a
 * Portfolio API.
 */
export class PortfolioStrapiService extends StrapiService {
	/**
	 * The default options for any Strapi service instance.
	 */
	static override readonly defaultOptions: Required<OptionalProps<PortfolioStrapiServiceOptions>> =
		merge({}, StrapiService.defaultOptions);

	/**
	 * The options set for this Strapi service instance.
	 */
	protected override readonly options: Required<PortfolioStrapiServiceOptions>;

	/**
	 * Creates a new instance of a Portfolio Strapi service.
	 * @param options - Portfolio Strapi service options
	 */
	constructor(options: PortfolioStrapiServiceOptions) {
		const _options = merge({}, StrapiService.defaultOptions, options);
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