const defaultConfig = {
    id: null,
    router: null,
    ignoreRoutes: [],
    skipSamePath: false
}

let config = { ...defaultConfig }

export function updateConfig (params) {

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
