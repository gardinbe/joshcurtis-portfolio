import { Router } from "vue-router";

enum AppError {
	NOT_FOUND = "NOT_FOUND_ERROR",
	INTERNAL = "INTERNAL_ERROR",
	CONTENT = "CONTENT_ERROR"
}

/**
 * Returns an `Error` instance that indicates that the requested content
 * or page could not be found.
 *
 * Redirects the user to the 'not found' page if thrown.
 */
export const notFoundError = () =>
	new Error(AppError.NOT_FOUND);

/**
 * Throws an error that indicates that the requested content
 * or page could not be found.
 *
 * Redirects the user to the 'not found' page.
 */
export const throwNotFoundError = () => {
	throw notFoundError();
};

/**
 * Returns an `Error` instance that indicates that there was an error setting
 * or retrieving content.
 *
 * Redirects the user to the 'internal error' page if thrown.
 */
export const contentError = () =>
	new Error(AppError.CONTENT);

/**
 * Throws an error that indicates that there was an error setting
 * or retrieving content.
 *
 * Redirects the user to the 'internal error' page.
 */
export const throwContentError = () => {
	throw contentError();
};


/**
 * Returns an `Error` instance that indicates that there was an internal
 * application error.
 *
 * Redirects the user to the 'internal error' page if thrown.
 */
export const internalError = () =>
	new Error(AppError.INTERNAL);

/**
 * Throws an error that indicates that there was an internal
 * application error.
 *
 * Redirects the user to the 'internal error' page.
 */
export const throwInternalError = () => {
	throw internalError();
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

		switch (err.message as AppError) {
			case AppError.NOT_FOUND:
				console.error("Page or content not found");
				void router.push("/not-found");
				break;

			case AppError.INTERNAL:
			case AppError.CONTENT:
			default:
				console.error("Internal application error occurred");
				void router.push("/error");
				break;
		}

		if (!import.meta.env.PROD)
			console.error(err);
	};
