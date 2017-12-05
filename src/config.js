const defaultConfig = {
    id: null,
    router: null,

    env: null,
    onlyProd: true,
    ignoreRoutes: [],
    skipSamePath: false
}

let config = { ...defaultConfig }

export function updateConfig (params) {
    // Set env param to passed value or process.env or "production"
    params['env'] = params['env'] || process.env.NODE_ENV || "production"

    function merge (obj, src) {
        Object.keys(src).forEach(function (key) {
            if (obj[key] && typeof obj[key] === 'object') {merge(obj[key], src[key]); return}
            obj[key] = src[key]
        })

      return obj
    }

    merge(config, params)
}

export default config
