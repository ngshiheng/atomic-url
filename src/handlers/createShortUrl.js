import { generateUniqueUrlKey } from '../utils/urlKey'

/*
Generates a short URL given an original URL.

Creates a new `urlKey: originalUrl` key-value pair in KV.

Example:

```sh
$ curl --request POST \
  --url http://yourdomain.com/api/url \
  --header 'Content-Type: application/json' \
  --data '{
	"originalUrl": "https://jerrynsh.com/how-to-build-a-pastebin-clone-for-free/"
}'
```

JSON Response:
```json
{
	"urlKey": "IgWKmlXD",
	"shortUrl": "https://yourdomain.com/IgWKmlXD",
	"originalUrl": "https://jerrynsh.com/how-to-build-a-pastebin-clone-for-free/"
}
```
*/
export const createShortUrl = async (request, event) => {
    /* eslint-disable no-undef */
    try {
        const urlKey = await generateUniqueUrlKey()

        const { host } = new URL(request.url)
        const shortUrl = `https://${host}/${urlKey}`

        const { originalUrl } = await request.json()
        const response = new Response(
            JSON.stringify({
                urlKey,
                shortUrl,
                originalUrl,
            }),
            { headers: { 'Content-Type': 'application/json' } }
        )
        const cache = await caches.open(URL_CACHE)

        event.waitUntil(
            URL_DB.put(urlKey, originalUrl, {
                expirationTtl: URL_EXPIRATION_TTL,
            })
        )
        event.waitUntil(cache.put(originalUrl, response.clone()))

        return response
    } catch (error) {
        console.error(error, error.stack)
        return new Response('Internal Server Error', { status: 500 })
    }
}
