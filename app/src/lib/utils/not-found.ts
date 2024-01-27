/**
 * Redirects the user to the 404 not found page.
 */
export const notFound = () => {
	throw new Error("Content not found");
};