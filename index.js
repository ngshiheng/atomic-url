import { Router } from 'itty-router'
import { createShortUrl } from './src/handlers/createShortUrl'
import { redirectShortUrl } from './src/handlers/redirectShortUrl'
import { shortUrlCacheMiddleware } from './src/middleware/shortUrlCache'
import { LANDING_PAGE_HTML } from './src/utils/constants'

const router = Router()

// GET landing page html
router.get('/', () => {
    return new Response(LANDING_PAGE_HTML, {
        headers: {
            'content-type': 'text/html;charset=UTF-8',
        },
    })
})

// GET redirects short URL to its original URL.
router.get('/:text', redirectShortUrl)

// POST creates a short URL that is associated with its an original URL.
router.post('/api/url', shortUrlCacheMiddleware, createShortUrl)

// 404 for everything else.
router.all('*', () => new Response('Not Found', { status: 404 }))

// All incoming requests are passed to the router where your routes are called and the response is sent.
addEventListener('fetch', (e) => {
    e.respondWith(router.handle(e.request, e))
})
