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


*/
export const createShortUrl = async (request) => {
    const { hostname } = new URL(request.url)
    const { originalUrl } = await request.json()

    const urlKey = await generateUniqueUrlKey()
    await URL_DB.put(urlKey, originalUrl)

    return new Response(
        JSON.stringify({
            urlKey,
            shortUrl: `https://${hostname}/${urlKey}`,
            originalUrl,
        }),
        { headers: { 'Content-Type': 'application/json' } }
    )
}
