import { check, group, sleep } from 'k6'
import http from 'k6/http'

export const options = {
    duration: '10s',
    vus: 1,
    thresholds: {
        http_req_failed: ['rate==0.00'],
        http_req_duration: ['p(95)<1000'],
    },
}

let shortenLink

const BASE_URL = __ENV.TEST_URL
const DUMMY_ORIGINAL_URL = 'https://jerrynsh.com/i-built-my-own-tiny-url/'

export default function () {
    group('visit main page', function () {
        const res = http.get(BASE_URL)

        check(res, {
            'is status 200': (r) => r.status === 200,
            'verify homepage text': (r) => r.body.includes('A URL shortener POC built using Cloudflare Worker'),
        })

        sleep(1) // second
    })

    group('visit rest endpoint', function () {
        const res = http.post(`${BASE_URL}/api/url`, JSON.stringify({ originalUrl: DUMMY_ORIGINAL_URL }), { headers: { 'Content-Type': 'application/json' } })

        check(res, {
            'is status 200': (r) => r.status === 200,
            'verify createShortUrl': (r) => {
                const { urlKey, shortUrl, originalUrl } = JSON.parse(r.body)
                shortenLink = shortUrl
                return urlKey.length === 8 && originalUrl === DUMMY_ORIGINAL_URL
            },
        })

        sleep(1) // second
    })

    group('visit shortUrl', function () {
        const res = http.get(shortenLink)

        check(res, {
            'is status 200': (r) => r.status === 200,
            'verify original url': (r) => r.url === DUMMY_ORIGINAL_URL,
        })

        sleep(1) // second
    })
}
