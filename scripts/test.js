import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    duration: '30s',
    vus: 1,
    thresholds: {
        http_req_failed: ['rate==0.00'],
        http_req_duration: ['p(95)<1000'],
    },
}

const BASE_URL = 'https://s.jerrynsh.com'

export default function () {
    const res = http.get(BASE_URL)

    check(res, {
        'is status 200': (r) => r.status === 200,
        'verify homepage text': (r) =>
            r.body.includes(
                '<h2 class="subtitle colored is-4">A URL shortener POC built using Cloudflare Worker.</h2>'
            ),
    })

    sleep(1)
}
