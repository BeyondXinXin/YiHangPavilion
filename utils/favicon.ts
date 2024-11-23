const FAVICON_API = 'https://www.favicon.vip/get.php?url=';

const siteToUrl: Map<string, string> = new Map();



export function getDomainName(url: string) {
  let domain = url.replace(/(^\w+:|^)\/\//, '');
  domain = domain.replace(/^www\./, '');
  const matches = domain.match(/([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/);
  if (matches && matches.length > 1) return matches[1];
  return null;
}

export function getFaviconUrl(url: string) {
  const paramsUrl = getDomainName(url);
  if (paramsUrl == null) return '';
  const optUrl = siteToUrl.get(paramsUrl);
  if (optUrl) return optUrl;
  return `${FAVICON_API + paramsUrl}`;
}
