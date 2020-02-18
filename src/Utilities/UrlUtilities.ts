export const trimUrl = (url: string): string => url.endsWith('/')
	? trimUrl(url.substring(0, url.length - 1))
	: url;
