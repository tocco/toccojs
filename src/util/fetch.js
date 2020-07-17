import base64 from 'base-64'

export const fetchFn = () => {
    if (typeof fetch !== 'undefined') {
        return fetch
    } else {
        return require('node-fetch')
    }
}

export const buildQueryString = params => {
    if (!params || Object.keys(params).length === 0) {
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
            options.headers['Authorization'] = `Basic ${base64.encode(`${app.credentials.username}:${app.credentials.apiKey}`)}`
        }

        const url = buildUrl(app.basePath, path, options.queryParams)
        delete options.queryParams

        return fetchFn()(url, options)
            .then(response => response.json())
    }
}

export default initialize
