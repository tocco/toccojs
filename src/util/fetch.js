import base64 from 'base-64'

/*
 * We need to send our session ID as nice_auth cookie with every request to prevent the backoffice
 * from creating a new session for every request.
 *
 * Usually, this can be done by simply adding the fetch option `credentials: 'include'`.
 * However, node-fetch (https://github.com/bitinn/node-fetch) hasn't implemented this property at this stage.
 *
 * As a workaround, we extract and send the cookie manually.
 */
export const sessionIds = {}

export const extractAndStoreSessionId = (credentials, response) => {
    const cookie = response.headers.get('set-cookie')
    if (cookie) {
        const match = cookie.match(/nice_auth=([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/)
        if (match && match[1]) {
            const sessionId = match[1];
            if (credentials && credentials.username) {
                sessionIds[credentials.username] = sessionId
            }
        }
    }
    return response
}

export const fetchFn = () => {
    if (typeof fetch !== 'undefined') {
        return fetch
    } else {
        return require('node-fetch')
    }
}

export const buildQueryString = params => {
    if (!params) {
        return ''
    }

    const paramsArray = []

    Object.keys(params)
        .forEach(key => {
            const param = params[key]
            if (Array.isArray(param)) {
                param.forEach(value => paramsArray.push(key + '=' + value))
            } else {
                paramsArray.push(key + '=' + param)
            }
        })

    return '?' + paramsArray.join('&')
}

export const buildUrl = (basePath, path, queryParams) => {
    const queryString = buildQueryString(queryParams)
    return basePath + path + queryString
}

export const initialize = app => {
    return (path, options = {}) => {
        if (!options.headers) {
            options.headers = {}
        }

        options.headers['Accept'] = 'application/json'

        options.headers['X-Business-Unit'] = app.businessUnit || '__n-u-l-l__'

        if (app.credentials) {

            options.headers['Authorization'] = `Basic ${base64.encode(`${app.credentials.username}:${app.credentials.password}`)}`

            const sessionId = sessionIds[app.credentials.username]
            if (sessionId) {
                options.headers.cookie = 'nice_auth=' + sessionId;
            }
        }

        const url = buildUrl(app.basePath, path, options.queryParams)
        delete options.queryParams

        return fetchFn()(url, options)
            .then(response => extractAndStoreSessionId(app.credentials, response))
            .then(response => response.json())
    }
}

export default initialize
