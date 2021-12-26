/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(...) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
export const readRequestBody = async (request) => {
    const { headers } = request
    const contentType = headers.get('content-type') || ''

    // Parse POST requests
    if (contentType.includes('application/json')) {
        return await request.json()
    }

    // Parse POST requests from form submission
    if (contentType.includes('form')) {
        const body = {}
        const formData = await request.formData()

        for (const entry of formData.entries()) {
            body[entry[0]] = entry[1]
        }

        return body
    }

    return {}
}
