import { generateUniqueUrlKey } from '../utils/urlKey'

/*
Generates a short URL given an original URL.

Creates a new `urlKey: originalUrl` key-value pair in KV.

Example:

Request:
```sh
$ curl --request POST \
  --url http://yourdomain.com/api/url \
  --header 'Content-Type: application/json' \
  --data '{
	"originalUrl": "https://www.notion.so/jerrynsh/How-I-Built-My-Own-TinyURL-For-Free-0f04b71be49447cea7477a346c3b8f79"
}'
```

Response:
```json
{
	"urlKey": "IgWKmlXD",
	"shortUrl": "https://yourdomain.com/IgWKmlXD",
	"originalUrl": "https://www.notion.so/jerrynsh/How-I-Built-My-Own-TinyURL-For-Free-0f04b71be49447cea7477a346c3b8f79"
}
```

Do note that Cache API is not enabled on `workers.dev` 

You will need to deploy this over a custom domain to see it work.
*/
export const createShortUrl = async (request, event) => {
    try {
        const { host } = new URL(request.url)
        const { originalUrl } = await request.json()

        const cache = caches.default

        let response = await cache.match(originalUrl)

        if (!response) {
            console.log('Cache not found. Creating new response')

            const urlKey = await generateUniqueUrlKey()
            const shortUrl = `https://${host}/${urlKey}`

            response = new Response(
                JSON.stringify({
                    urlKey,
                    shortUrl,
                    originalUrl,
                }),
                { headers: { 'Content-Type': 'application/json' } }
            )

            event.waitUntil(URL_DB.put(urlKey, originalUrl))
            event.waitUntil(cache.put(originalUrl, response.clone()))

            return response
        }

        console.log('Serving response from cache')
        return response
    } catch (error) {
        console.error(error, error.stack)
        return new Response('Unexpected Error', { status: 500 })
    }
}
