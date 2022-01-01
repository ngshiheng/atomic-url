import { URL_CACHE } from '../utils/constants'
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
	"originalUrl": "https://www.notion.so/jerrynsh/How-I-Built-My-Own-TinyURL-For-Free-0f04b71be49447cea7477a346c3b8f79"
}'
```

JSON Response:
```json
{
	"urlKey": "IgWKmlXD",
	"shortUrl": "https://yourdomain.com/IgWKmlXD",
	"originalUrl": "https://www.notion.so/jerrynsh/How-I-Built-My-Own-TinyURL-For-Free-0f04b71be49447cea7477a346c3b8f79"
}
```
*/
export const createShortUrl = async (request, event) => {
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

        event.waitUntil(URL_DB.put(urlKey, originalUrl))
        event.waitUntil(cache.put(originalUrl, response.clone()))

        return response
    } catch (error) {
        console.error(error, error.stack)
        return new Response('Unexpected Error', { status: 500 })
    }
}
