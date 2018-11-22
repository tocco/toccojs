# ToccoJS

ToccoJS is a JavaScript library for facilitating the interaction with the Tocco REST API.

## Installation

You can use ToccoJS as a `<script>` tag from a CDN, or as a `toccojs` package on npm.

(not yet published)

## Examples

Checkout the examples directory in this repository.

Example of a simple Node script:

```javascript
import tocco from 'toccojs'

tocco.initialize({
    host: 'https://my.tocco.ch'
})

const entities = tocco.entities()

entities.list('User').then(data => {
    console.log(data.length + ' Users received')
})
```

## API

- `initialize`

  Initializes the app. This is required, before you can fetch or create any data.

  Parameters:
    - `config`:
      - `host`: Hostname as string (e.g. 'https://my.customer.ch')

- `setCredentials`

  Sets the credentials to use for all subsequent requests.
  
  Parameters:
  - `credentials` (object consisting of `username` and `password`)
    
- `entities`

  Returns the [entities API](#entities-api).

### Entities API

- `list`

  Lists entities of the given model.
  
  Parameters:
  - `entityName`
  
- `get`

  Fetches a single entity by key.
  
  Parameters:
  - `entityName`
  - `key`
  - `options`
    - `paths`: Which paths to include in the response

## Develop

Install the dependencies: `npm install`

`npm run build` builds the library to `dist`, generating three files:

* `dist/toccojs.cjs.js`
    A CommonJS bundle, suitable for use in Node.js, that `require`s the external dependency. This corresponds to the `"main"` field in package.json
* `dist/htoccojs.esm.js`
    an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. This corresponds to the `"module"` field in package.json
* `dist/toccojs.umd.js`
    a UMD build, suitable for use in any environment (including the browser, as a `<script>` tag), that includes the external dependency. This corresponds to the `"browser"` field in package.json

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change using [rollup-watch](https://github.com/rollup/rollup-watch).

## License

[MIT](LICENSE)
