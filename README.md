<h1 align="center"><strong>Atomic URL</strong></h1>

<p align="center">
  <img src="https://i.imgur.com/mlUqwN0.png">
  <figcaption align="center"><i>A URL shortener POC built using Cloudflare Worker</i></figcaption>
</p>

Designing a URL shortener such as [TinyURL](https://tinyurl.com/) and [Bitly](https://bitly.com/) is one of the most common System Design interview questions in software engineering.

While meddling around with Cloudflare Worker, it gave me an idea to build an actual URL shortener that can be used by anyone.

This is a proof of concept (POC) of how one builds an actual URL shortener service using serverless computing.

## Requirements

-   Get a [Cloudflare](https://www.cloudflare.com/) account.
-   Install [Wrangler](https://github.com/cloudflare/wrangler#installation) CLI for Cloudflare Workers deployment.

## Setup

### Installation

This project is initialized using the [`itty-router`](https://github.com/kwhitley/itty-router) [worker template](https://github.com/cloudflare/worker-template-router).

```sh
npm install
```

### Creating KV

Since we're using KV as our storage, we need to first create it.

```sh
# For development:
wrangler kv:namespace create
wrangler kv:namespace create --preview "URL_DB"

# For production:
wrangler kv:namespace create "URL_DB" --env=production
```

For creating these KV namespaces, remember to update your [`wrangler.toml`](./wrangler.toml) file to include the namespace bindings accordingly. Do update your `account_id` accordingly while you are at it.

## Usage

To try out the project locally, simply run `wrangler dev`.

## Deployment

To publish any new changes to your Cloudflare Worker, run `wrangler publish`

Before publishing your code you need to edit `wrangler.toml` file and add your Cloudflare `account_id` - more information about configuring and publishing your code can be found [in the documentation](https://developers.cloudflare.com/workers/learning/getting-started#7-configure-your-project-for-deployment).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Steps

1. Fork this
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Please make sure you have installed the `pre-commit` hook and make sure it passes all the lint and format check
4. Commit your changes (`git commit -am 'feat: Add some fooBar'`, make sure that your commits are [semantic](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716))
5. Push to the branch (`git push origin feature/fooBar`)
6. Create a new Pull Request
