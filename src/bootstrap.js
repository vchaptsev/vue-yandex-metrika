import config from './config'

export default function bootstrap (Vue) {
    if (typeof document === 'undefined') {return}

    const { id, ignoreRoutes, skipSamePath } = config

    if (!id) {throw new Error('[vue-yandex-metrika] Please enter a Yandex Metrika tracking ID')}

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
        // Create Metrika
        Vue.prototype.$metrika = Vue.$metrika = new Ya.Metrika({id: id})

        // Run page autotracking
        config.router.afterEach(function (to, from) {

            //  do not track page visit if previous and next routes URLs match
            if (skipSamePath && to.path == from.path) {return}

            // check if route is in ignoreRoutes
            if (ignoreRoutes.includes(to.name)) {return}

            // track page visit
            Vue.$metrika.hit(to.path, {referer: from.path})
        })
    })

    .catch(error => {console.error(error)})
}
