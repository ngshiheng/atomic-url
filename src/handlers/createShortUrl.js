/*
Try send a POST request using curl or another tool.

Try the below curl command to send JSON:

$ curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
*/
export const createShortUrl = async (request) => {
    // Create a base object with some fields.
    let fields = {
        asn: request.cf.asn,
        colo: request.cf.colo,
    }

    // If the POST data is JSON then attach it to our response.
    if (request.headers.get('Content-Type') === 'application/json') {
        fields['json'] = await request.json()
    }

    // Serialise the JSON to a string.
    const returnData = JSON.stringify(fields, null, 2)

    return new Response(returnData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
