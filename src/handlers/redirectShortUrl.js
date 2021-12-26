/*
Redirects short URL to its original URL.

Example visit /q2W3eg1 would redirect you to its original URL.
*/
export const redirectShortUrl = async ({ params, url }) => {
    const urlKey = decodeURIComponent(params.text)

    const originalUrl = await URL_DB.get(urlKey)
    if (originalUrl !== null) {
        return Response.redirect(originalUrl, 301)
    }
    return new Response('Not Found', { status: 404 })
}
