import { Router } from "vue-router";

enum AppError {
	NOT_FOUND = "NOT_FOUND_ERROR",
	INTERNAL = "INTERNAL_ERROR",
	CONTENT = "CONTENT_ERROR"
}

/**
 * Indicates that the requested content or page could not be found.
 *
 * Redirects the user to the 404 not found page.
 */
export const notFound = () => {
	throw new Error(AppError.NOT_FOUND);
};

/**
 * Indicates that there was an internal application error.
 *
 * Redirects the user to the internal error page.
 */
export const internalError = () => {
	throw new Error(AppError.INTERNAL);
};

/**
 * Indicates that there was an error retrieving or setting content.
 *
 * Redirects the user to the internal error page.
 */
export const contentError = () => {
	throw new Error(AppError.CONTENT);
};

/**
 * Returns a function to handle global errors with the Vue application.
 * @param router - Vue router instance
 * @returns Error handler
 */
export const errorHandler = (router: Router) =>
	(err: unknown) => {
		if (!(err instanceof Error)) {
			console.error(err);
			return;
		}

		switch (err.message) {
			case AppError.NOT_FOUND:
				console.error("Page or content not found");
				void router.push("/not-found");
				break;

			case AppError.INTERNAL:
			case AppError.CONTENT:
			default:
				console.error("Internal application error occurred");
				void router.push("/internal-error");
				break;
		}

		if (!import.meta.env.PROD)
			throw err;
	};
