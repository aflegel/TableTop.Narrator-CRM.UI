export const trimUrl = (url: string): string => {
	const fixedPath = url.endsWith('/')
		? trimUrl(url.substring(0, url.length - 1))
		: url;

	return fixedPath;
};