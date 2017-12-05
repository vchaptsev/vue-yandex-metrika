let config = {
    id: null,
    router: null,

    env: null,
    onlyProd: true,
    ignoreRoutes: [],
    skipSamePath: false
}

export function updateConfig (params) {
    // Set env param to passed value or process.env or "production"
    params['env'] = params['env'] || process.env.NODE_ENV || "production"

    // Merge default config and plugin options
    Object.keys(params).forEach(function (key) {config[key] = params[key]})
}

export default config
