const TURNSTILE_SITEVERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/*
Turnstile is Cloudflare's smart CAPTCHA alternative.

A middleware that calls Cloudflare's siteverify endpoint to validate the Turnstile widget response.

Do note to set `TURNSTILE_SECRET` and `TEST_URL` accordingly.
*/
export const turnstileMiddleware = async (request) => {
    /* eslint-disable no-undef */
    if (request.url == TEST_URL) {
        console.log('Skipping Turnstile verification for tests.')
        return
    }

    const { turnstileToken } = await request.clone().json()

    const response = await fetch(TURNSTILE_SITEVERIFY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `response=${turnstileToken}&secret=${TURNSTILE_SECRET}`,
    })

    const verification = await response.json()
    if (!verification.success) {
        return new Response('Too Many Requests', { status: 429 })
    }
}
