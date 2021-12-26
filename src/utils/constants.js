export const ALPHABET =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const LANDING_PAGE_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>URL Shortener ⛅</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        URL Shortener
      </h1>
      <div class="block">
        <div class="field is-grouped">
          <form action="/api/url" method="POST">
            <div class="control">      
              <input class="input is-focused" type="url" placeholder="Enter a URL to shorten..." name="originalUrl" id="originalUrl">
              <button class="button is-primary">Shorten</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  </body>
</html>
`
