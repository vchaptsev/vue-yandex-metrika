import config from './config'

export default function bootstrap (Vue) {
    if (typeof document === 'undefined') {return}

    if (!config.id) {throw new Error('[vue-yandex-metrika] Please enter a Yandex Metrika tracking ID')}
    if (!config.router) {throw new Error('[vue-yandex-metrika] Please pass a router array')}

    // Load script (creates DOM-element)
    return new Promise((resolve, reject) => {
        return new Promise((resolve, reject) => {
            var head = document.head || document.getElementsByTagName('head')[0]
            const script = document.createElement('script')

            script.async = true
            script.charset = 'utf8'
            script.src = 'https://mc.yandex.ru/metrika/watch.js'

            head.appendChild(script)

            script.onload = resolve
            script.onerror = reject
        })
        .then(() => {resolve()})
        .catch(() => {reject('[vue-yandex-metrika] It\'s not possible to load Yandex Metrika script')})
    })

    .then(() => {
        // do not create Metrika if onlyProd and env !== "production"
        if (config.onlyProd && config.env !== "production") {
            return console.log('[vue-yandex-metrika] Tracking is disabled, because onlyProd option is true and env option is', config.env)
        }

        // Create Metrika
        Vue.prototype.$metrika = Vue.$metrika = new Ya.Metrika({id: config.id})

        // Run page autotracking
        config.router.afterEach(function (to, from) {

            // check if route is in ignoreRoutes
            if (config.ignoreRoutes.includes(to.name)) {return}

            // do not track page visit if previous and next routes URLs match
            if (config.skipSamePath && to.path == from.path) {return}

            // track page visit
            Vue.$metrika.hit(to.path, {referer: from.path})
        })
    })

    .catch(error => {console.error(error)})
}
