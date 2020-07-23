const list = app => (entityName, options = {}) => {
    const fetchOptions = {
        queryParams: {}
    }

    if (options.paths) {
        fetchOptions.queryParams['_paths'] = options.paths.join(',')
    }

    return app.fetch(`/entities/2.0/${entityName}`, fetchOptions)
        .then(response => response.data)
}

const get = app => (entityName, key, options = {}) => {
    const fetchOptions = {
        queryParams: {}
    }

    if (options.paths) {
        fetchOptions.queryParams['_paths'] = options.paths.join(',')
    }

    return app.fetch(`/entities/2.0/${entityName}/${key}`, fetchOptions)
        .then(response => response)
}

const entities = app => ({
    list: list(app),
    get: get(app)
})

export default entities
