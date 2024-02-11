import { ApiService, ApiServiceOptions } from "@/lib/services/api-service";
import { StrapiResponse, SingleResponse, CollectionResponse, StrapiRequestParams, Item, SingleRequestParams, CollectionRequestParams } from "@/lib/types/strapi";
import { DefaultOptions, Options } from "@/lib/types/utils";
import { throwExp } from "@/lib/utils";

/**
 * Options for a Strapi service.
 */
export interface StrapiServiceOptions extends ApiServiceOptions { }

/**
 * Service for handling and performing requests to a Strapi API.
 */
export class StrapiService extends ApiService<StrapiResponse, StrapiRequestParams> {
	static override readonly DEFAULT_OPTIONS: DefaultOptions<StrapiServiceOptions> =
		ApiService.DEFAULT_OPTIONS;

	protected override readonly options: Options<StrapiServiceOptions>;

	/**
	 * Creates a new Strapi service instance.
	 * @param options - Strapi service options
	 */
	constructor(options: StrapiServiceOptions) {
		const _options = StrapiService.createOptions(
			StrapiService.DEFAULT_OPTIONS,
			options
		);
		super(_options);
		this.options = _options;
	}

	/**
	 * Retrieves a single item from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Single type
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	protected async getSingle<
		TItem extends Item = Item,
		TResponse extends SingleResponse<TItem> = SingleResponse<TItem>,
		TParams extends SingleRequestParams = SingleRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data;
	}

	/**
	 * Retrieves a collection of items from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Collection
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	protected async getCollection<
		TItem extends Item = Item,
		TResponse extends CollectionResponse<TItem> = CollectionResponse<TItem>,
		TParams extends CollectionRequestParams = CollectionRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data;
	}

	/**
	 * Retrieves the first item within a collection of items from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns First item within collection
	 * @throws Error if request failed, took too long, or reached max attempts, or if collection is empty
	 */
	protected async getCollectionFirstItem<
		TItem extends Item = Item,
		TResponse extends CollectionResponse<TItem> = CollectionResponse<TItem>,
		TParams extends CollectionRequestParams = CollectionRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data[0]
			?? throwExp("No result found");
	}
}