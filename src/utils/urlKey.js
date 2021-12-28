import { customAlphabet } from 'nanoid'
import { ALPHABET } from './constants'

/*
Generate a unique `urlKey` using `nanoid` package.

Keep retrying until a unique urlKey which does not exist in the URL_DB.
*/
export const generateUniqueUrlKey = async () => {
    const nanoId = customAlphabet(ALPHABET, 8)

    let urlKey = nanoId()

    while ((await URL_DB.get(urlKey)) !== null) {
        urlKey = nanoId()
    }

    return urlKey
}
