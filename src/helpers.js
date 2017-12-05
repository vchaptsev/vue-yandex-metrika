import config from './config'


export function updateConfig (params) {

    // Merges default config and plugin options
    params['env'] = params['env'] || process.env.NODE_ENV || "production"
    Object.keys(params).forEach(function (key) {config[key] = params[key]})
}


export function checkConfig () {

    // Checks if all required options are presented
    /* istanbul ignore next */  if (typeof document === 'undefined') {return}
    if (!config.id) {throw new Error('[vue-yandex-metrika] Please enter a Yandex Metrika tracking ID')}
    if (!config.router) {throw new Error('[vue-yandex-metrika] Please pass a router array')}
}

export function loadScript () {
    /* istanbul ignore function */

    // Loads Metrika script
    return new Promise((resolve, reject) => {/* istanbul ignore next */
        var head = document.head || document.getElementsByTagName('head')[0]
        const script = document.createElement('script')

        script.async = true
        script.charset = 'utf8'
        script.src = 'https://mc.yandex.ru/metrika/watch.js'

        head.appendChild(script)

        script.onload = resolve
        script.onerror = reject
    })
}


export function createMetrika (Vue) {

    // Creates Metrika
    if (config.productionOnly && config.env !== "production") {
        console.log('[vue-yandex-metrika] Tracking is disabled, because productionOnly option is true and env option is', config.env)
        return
    }

    return Vue.prototype.$metrika = Vue.$metrika = new Ya.Metrika({id: config.id})
}


export function startTracking (metrika) {

    // Starts page autotracking
    config.router.afterEach(function (to, from) {

        // check if route is in ignoreRoutes
        if (config.ignoreRoutes.includes(to.name)) {return}

        // do not track page visit if previous and next routes URLs match
        if (config.skipSamePath && to.path == from.path) {return}

        // track page visit
        metrika.hit(to.path, {referer: from.path})
    })
}
