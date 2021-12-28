import { customAlphabet } from 'nanoid'
import { ALPHABET } from '../utils/constants'
import { readRequestBody } from '../utils/parser'

/*
Generates a short URL given an original URL.

Creates a new `urlKey: originalUrl` key-value pair in KV.
*/
export const createShortUrl = async (request) => {
    const { hostname } = new URL(request.url)
    const { originalUrl } = await readRequestBody(request)

    const urlKey = await generateUniqueUrlKey()
    await URL_DB.put(urlKey, originalUrl)

    // Redirect if request type is form
    const { headers } = request
    const contentType = headers.get('content-type') || ''
    if (contentType.includes('form')) {
        return Response.redirect(`https://${hostname}/`)
    }

    return new Response(
        JSON.stringify(
            {
                urlKey,
                shortUrl: `https://${hostname}/${urlKey}`,
                originalUrl,
            },
            null,
            2
        ),
        {
            headers: { 'Content-Type': 'application/json' },
        }
    )
}

/*
Generate a unique `urlKey` using `nanoid` package.

Keep retrying until a unique urlKey which does not exist in the URL_DB.
*/
const generateUniqueUrlKey = async () => {
    const nanoId = customAlphabet(ALPHABET, 8)

    let urlKey = nanoId()

    while ((await URL_DB.get(urlKey)) !== null) {
        urlKey = nanoId()
    }

    return urlKey
}
