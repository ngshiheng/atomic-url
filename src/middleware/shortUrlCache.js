/*
A cache middleware that checks if `originalUrl` is present in the `URL_CACHE` cache.

Do note that Cache API is not enabled on `workers.dev`.

You will need to deploy this over a custom domain to see it work.
*/
export const shortUrlCacheMiddleware = async (request) => {
    const { originalUrl } = await request.clone().json()

    if (!originalUrl) {
        return new Response('Bad Request', {
            status: 400,
        })
    }

    /* eslint-disable no-undef */
    const cache = await caches.open(URL_CACHE)
    const response = await cache.match(originalUrl)

    if (response) {
        console.log('Serving response from cache.')
        return response
    }
}
