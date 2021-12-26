import { customAlphabet } from 'nanoid'

/*
Try send a POST request using curl or another tool.

Try the below curl command to send JSON:

$ curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
*/

const characterSet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const createShortUrl = async (request) => {
    if (request.headers.get('Content-Type') !== 'application/json') {
        return new Response('Unsupported Content Type', { status: 415 })
    }

    let response = {
        shortUrl: generateUniqueUrlKey(),
    }

    const { originalUrl } = await request.json()
    response['originalUrl'] = originalUrl

    const data = JSON.stringify(response, null, 2)

    return new Response(data, {
        headers: { 'Content-Type': 'application/json' },
    })
}

const generateUniqueUrlKey = () => {
    const nanoId = customAlphabet(characterSet, 8)

    const urlKey = nanoId()
    // TODO: Query KV to see if urlKey already exist

    return urlKey
}
