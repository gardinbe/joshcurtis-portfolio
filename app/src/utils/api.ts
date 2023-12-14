import config from "@/config";
import { delay } from "@/utils/delay";
import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

export type ApiOptions = {
	/** Base URL of the API. */
	baseURL: string;
	/** Default URL parameters to be passed on every request. */
	params: Record<string, string>;
	/** Number of times to attempt an API call before giving up. @default 5 attempts. */
	retryCount: number;
	/** The time to wait for a response (in milliseconds) before giving up. @default 30 seconds */
	timeout: number;
};

export class Api {
	protected httpClient: AxiosInstance;

	constructor(options: Partial<ApiOptions>) {
		this.httpClient = axios.create({
			baseURL: options?.baseURL,
			params: options?.params,
			timeout: options?.timeout
		});

		axiosRetry(this.httpClient, {
			retries: options?.retryCount ?? 5
		});

		if (config.artificialDelay) {
			this.httpClient.interceptors.request.use(async cfg => {
				await delay(config.artificialDelayDuration);
				return cfg;
			});
		}
	}
}