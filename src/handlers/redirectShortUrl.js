/*
Redirects short URL to its original URL.

Example:

Visiting http://s.jerrynsh.com/FpS0a2LU would redirect you to its original URL.
*/
export const redirectShortUrl = async ({ params }) => {
    /* eslint-disable no-undef */
    const urlKey = decodeURIComponent(params.text)

    const originalUrl = await URL_DB.get(urlKey)

    if (originalUrl) {
        return Response.redirect(originalUrl, 301)
    }
    return new Response('Invalid Short URL', { status: 404 }) // TODO: Redirect to a better looking html page.
}
