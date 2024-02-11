import { StrapiService, StrapiServiceOptions } from "@/lib/services/strapi-service";
import { Product } from "@/lib/types/strapi-data/collection-items";
import { AboutPage, ContactPage, HomePage, WorkPage } from "@/lib/types/strapi-data/single-items";
import { DefaultOptions, Options } from "@/lib/types/utils";

/**
 * Options for a CMS service.
 */
export interface CMSServiceOptions extends StrapiServiceOptions { }

/**
 * A service for handling and performing specific requests to the Strapi
 * CMS API.
 */
export class CMSService extends StrapiService {
	static override readonly DEFAULT_OPTIONS: DefaultOptions<CMSServiceOptions> =
		StrapiService.DEFAULT_OPTIONS;

	protected override readonly options: Options<CMSServiceOptions>;

	/**
	 * Creates a new CMS service instance.
	 * @param options - CMS service options
	 */
	constructor(options: CMSServiceOptions) {
		const _options = CMSService.createOptions(
			CMSService.DEFAULT_OPTIONS,
			options
		);
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