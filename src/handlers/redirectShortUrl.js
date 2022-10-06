import NOT_FOUND_PAGE from '../404.html'

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
    return new Response(NOT_FOUND_PAGE, { headers: { 'Content-Type': 'text/html;charset=UTF-8' }, status: 404 })
}
