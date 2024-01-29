import { merge } from "lodash";
import { ApiService, ApiServiceOptions } from "@/lib/service-classes/api";
import { StrapiResponse, SingleResponse, CollectionResponse, StrapiRequestParams, Item, SingleRequestParams, CollectionRequestParams } from "@/lib/types/strapi";
import { OptionalProps } from "@/lib/types/utils";
import { throwExp } from "@/lib/utils";

/**
 * Options for a Strapi service.
 */
export interface StrapiServiceOptions extends ApiServiceOptions { }

/**
 * Service for handling and performing requests to a Strapi API.
 */
export class StrapiService extends ApiService<StrapiResponse, StrapiRequestParams> {
	/**
	 * The default options for any Strapi service instance.
	 */
	static override readonly defaultOptions: Required<OptionalProps<StrapiServiceOptions>> =
		merge({}, ApiService.defaultOptions);

	/**
	 * The options set for this Strapi service instance.
	 */
	protected override readonly options: Required<StrapiServiceOptions>;

	/**
	 * Creates a new instance of a Strapi service.
	 * @param options - Strapi service options
	 */
	constructor(options: StrapiServiceOptions) {
		const _options = merge({}, StrapiService.defaultOptions, options);
		super(_options);
		this.options = _options;
	}

	/**
	 * Retrieve a single item from the Strapi API.
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
	 * Retrieve a collection of items from the Strapi API.
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
	 * Retrieve the first item within a collection of items from the Strapi API.
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
		).data[0] ?? throwExp("No result found");
	}
}