/*
This route redirects short URL to its original URL.

Example visit /q2W3eg1 would redirect you to its original URL.
*/
export const redirectShortUrl = ({ params }) => {
    // Decode text like "Hello%20world" into "Hello world"
    let input = decodeURIComponent(params.text)

    // Construct a buffer from our input
    let buffer = Buffer.from(input, 'utf8')

    // Serialise the buffer into a base64 string
    let base64 = buffer.toString('base64')

    // Return the HTML with the string to the client
    return new Response(`<p>Base64 encoding: <code>${base64}</code></p>`, {
        headers: {
            'Content-Type': 'text/html',
        },
    })
}
