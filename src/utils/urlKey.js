import { customAlphabet } from 'nanoid'

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

/*
Generate a unique `urlKey` using `nanoid` package.

Keep retrying until a unique urlKey which does not exist in the URL_DB.
*/
export const generateUniqueUrlKey = async () => {
    /* eslint-disable no-undef */
    const nanoId = customAlphabet(ALPHABET, 8)

    let urlKey = nanoId()

    while ((await URL_DB.get(urlKey)) !== null) {
        urlKey = nanoId()
    }

    return urlKey
}
