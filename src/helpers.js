import config from './config'


export function updateConfig (params) {

    // Merges default config and plugin options
    Object.keys(params).forEach(function (key) {config[key] = params[key]})
}


export function checkConfig () {
    // Checks if config is valid

    /* istanbul ignore next */ if (typeof document === 'undefined') {return}
    /* istanbul ignore next */ if (!config.id) {throw new Error('[vue-yandex-metrika] Please enter a Yandex Metrika tracking ID')}
    /* istanbul ignore next */ if (!config.router && config.env !== 'production') {return console.warn('[vue-yandex-metrika] Router is not passed, autotracking is disabled')}
}

export function loadScript () {

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

    if (config.env === "production") {

        // Creates Metrika
        return Vue.prototype.$metrika = Vue.$metrika = new Ya.Metrika({id: config.id})

    } else {

        // Mock metrika
        console.warn('[vue-yandex-metrika] Tracking is disabled, because env option is not "production"\nYou will see all metrika actions in console.log()\nIf you want to start tracking, you need to set env option to "production" or productionOnly option to false')

        /* istanbul ignore next */
        return {
            addFileExtension() {console.log('[vue-yandex-metrika] addFileExtension:', arguments)},
            extLink() {console.log('[vue-yandex-metrika] extLink:', arguments)},
            file() {console.log('[vue-yandex-metrika] file:', arguments)},
            getClientID() {console.log('[vue-yandex-metrika] getClientID:', arguments)},
            hit() {console.log('[vue-yandex-metrika] hit:', arguments)},
            notBounce() {console.log('[vue-yandex-metrika] notBounce:', arguments)},
            params() {console.log('[vue-yandex-metrika] params:', arguments)},
            reachGoal() {console.log('[vue-yandex-metrika] reachGoal:', arguments)},
            replacePhones() {console.log('[vue-yandex-metrika] replacePhones:', arguments)},
            setUserID() {console.log('[vue-yandex-metrika] setUserID:', arguments)},
            userParam() {console.log('[vue-yandex-metrika] userParam:', arguments)}
        }
    }
}


export function startTracking (metrika) {

    // Starts autotracking if router is passed
    if (config.router) {
        config.router.afterEach(function (to, from) {

            // check if route is in ignoreRoutes
            if (config.ignoreRoutes.includes(to.name)) {return}

            // do not track page visit if previous and next routes URLs match
            if (config.skipSamePath && to.path == from.path) {return}

            // track page visit
            metrika.hit(to.path, {referer: from.path})
        })
    }
}
