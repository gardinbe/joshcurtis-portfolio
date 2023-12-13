import config from "@/config";
import { Response } from "@/types/api/strapi";
import { Api, ApiOptions } from "@/utils/api";

class StrapiApi extends Api {
	private cachedData: Map<string, Response>;

	constructor(options: Partial<ApiOptions>) {
		super(options);
		this.cachedData = new Map();
	}

	/**
	 * Set a cached Strapi API response into sessionStorage.
	 * @param endpoint Selected endpoint
	 * @param response Response to be cached
	 */
	private setCachedData(endpoint: string, response: Response) {
		this.cachedData.set(`strapi-cached-response-${endpoint}`, response);
	}

	/**
	 * Get a cached Strapi API response from sessionStorage.
	 * @param endpoint Selected endpoint
	 * @returns Cached data
	 */
	private getCachedData<T extends Response>(endpoint: string) {
		return (this.cachedData.get(`strapi-cached-response-${endpoint}`) ?? null) as T | null;
	}

	/**
	 * Fix a Strapi media items' URL: if the media item is being served directly from Strapi then we
	 * have to prepend the Strapi URL to the media items' path.
	 * @param url Target url
	 */
	mediaUrl(url: string) {
		return url.startsWith("/")
			? config.strapiUrl + url
			: url;
	}

	/**
	 * Send a GET request to a Strapi API endpoint. The response type must be defined
	 * to provide effective typing functionality.
	 * @param endpoint Endpoint to use
	 * @returns Promise containing response data
	 */
	async get<T extends Response>(endpoint: string) {
		if (config.contentCaching) {
			const cachedData = this.getCachedData<T>(endpoint);
			if (cachedData !== null)
				return cachedData;
		}

		const res = await this.httpClient.get<T>(endpoint);
		const data = res.data;

		if (config.contentCaching)
			this.setCachedData(endpoint, data);

		return data;
	}
}

export const strapi = new StrapiApi({
	baseURL: `${config.strapiUrl}/api/`,
	params: { populate: "deep" },
	retryCount: 5,
	timeout: config.strapiTimeoutDuration
});