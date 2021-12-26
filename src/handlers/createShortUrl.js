import { customAlphabet } from 'nanoid'

const characterSet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

/*
Generates a short URL given an original URL.

Creates a new `urlKey: originalUrl` key-value pair in KV.
*/
export const createShortUrl = async (request) => {
    if (request.headers.get('Content-Type') !== 'application/json') {
        return new Response('Unsupported Content Type', { status: 415 })
    }

    const { originalUrl } = await request.json()

    const urlKey = await generateUniqueUrlKey()

    await URL_DB.put(urlKey, originalUrl)

    const data = {
        shortUrl: urlKey,
        originalUrl,
    }

    const response = JSON.stringify(data, null, 2)

    return new Response(response, {
        headers: { 'Content-Type': 'application/json' },
    })
}

/*
Generate a unique `urlKey` using `nanoid` package.

Keep retrying until a unique urlKey which does not exist in the URL_DB.
*/
const generateUniqueUrlKey = async () => {
    const nanoId = customAlphabet(characterSet, 8)

    let urlKey = nanoId()

    while ((await URL_DB.get(urlKey)) !== null) {
        urlKey = nanoId()
    }

    return urlKey
}
