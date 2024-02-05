import { merge } from "lodash";
import { stringify } from "qs";
import { OptionalProps } from "@/lib/types/utils";
import { delay } from "@/lib/utils";

/**
 * Options for an API service.
 */
export interface ApiServiceOptions {
	/**
	 * Hostname of the API.
	 */
	hostname: string;
	/**
	 * Base URL path of the API. This will be appended to the hostname on every request.
	 *
	 * Include a leading, **but not a trailing slash - it's automatically appended**.
	 * @defaultValue null
	 */
	basePath?: string | null;
	/**
	 * Base URL parameters to be passed on every request.
	 * @defaultValue null
	 */
	baseParams?: Record<string, string> | null;
	/**
	 * Time to wait for a response (in seconds) before giving up.
	 *
	 * This applies to each individual request attempt.
	 * @defaultValue 30 seconds
	 */
	timeout?: number;
}

/**
 * A service for handling and performing API requests.
 *
 * Based on the Fetch API.
 */
export class ApiService<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TBaseResponse extends Record<string, any> = Record<string, any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TBaseParams extends Record<string, any> = Record<string, any>
> {
	static readonly defaultOptions: Required<OptionalProps<
		ApiServiceOptions
	>> = {
			basePath: null,
			baseParams: null,
			timeout: 30
		};

	protected readonly options: Required<ApiServiceOptions>;

	/**
	 * Creates a new API service instance.
	 * @param options - API service options
	 */
	constructor(options: ApiServiceOptions) {
		this.options = merge({}, ApiService.defaultOptions, options);
	}

	/**
	 * Send a GET request to the API.
	 *
	 * The response data type should be provided to provide effective typings.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Response data
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	async get<
		TResponse extends TBaseResponse = TBaseResponse,
		TParams extends TBaseParams = TBaseParams
	>(
		endpoint: string,
		params?: TParams,
		options?: RequestInit
	) {
		const _params = merge({}, this.options.baseParams, params);
		const encodedParams = "?" + stringify(_params);

		const url = this.options.hostname
			+ (this.options.basePath ?? "")
			+ "/"
			+ endpoint
			+ encodedParams;

		const sendRequest = async () => {
			const response = await fetch(url, options);
			if (!response.ok)
				throw new Error("Response was not OK");

			return response;
		};

		const response = await new Promise<Response>((resolve, reject) => {
			// TODO: do actual cancellation here? see AbortController
			void sendRequest()
				.then(resolve)
				.catch(reject);

			void delay(this.options.timeout * 1000)
				.then(() =>
					reject(`Request timed out after ${this.options.timeout * 1000} seconds`));
		});

		return await response.json() as TResponse;
	}
}