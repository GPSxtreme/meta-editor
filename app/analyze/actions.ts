'use server';

import url_metadata from "url-metadata"


const options = {
  // custom request headers
  requestHeaders: {
    'User-Agent': 'url-metadata/3.0 (npm module)',
    From: 'meta-editor.vercel.app',
  },

  // `fetch` API cache setting for request
  cache: 'no-cache',

  // `fetch` API mode (ex: `cors`, `no-cors`, `same-origin`, etc)
  mode: 'cors',

  // timeout in milliseconds, default is 10 seconds
  timeout: 10000,

  // number of characters to truncate description to
  descriptionLength: 750,

  // force image urls in selected tags to use https,
  // valid for 'image', 'og:image', 'og:image:secure_url' tags & favicons with full paths
  ensureSecureImageRequest: true,

  // return raw response body as string
  includeResponseBody: true
};
export const fetchSiteMetaData = async (url: string) => {
  try {
    const urlMetaData = await url_metadata(url, options);
    return urlMetaData;
  } catch (e) {
    throw new Error("Failed to fetch site metadata");
  }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  type UrlMetadata = Record<string, any>