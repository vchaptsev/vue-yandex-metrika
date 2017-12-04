import { loadScript } from './helpers'
import config from './config'

export default function bootstrap () {
    if (typeof document === 'undefined') {return}

    const { id, ignoreRoutes, skipSamePath } = config

    if (!id) {throw new Error('[vue-yandex-metrika] Please enter a Yandex Metrika tracking ID')}

    // Load script (creates DOM-element)
    return new Promise((resolve, reject) => {
        return loadScript()
            .then(() => {resolve()})
            .catch(() => {reject('[vue-yandex-metrika] It\'s not possible to load Yandex Metrika script')})
    })

    .then(() => {
        // Create Metrika
        var metrika = new Ya.Metrika({id: id})

        // Run page autotracking
        config.router.afterEach(function (to, from) {

            //  do not track page visit if previous and next routes URLs match
            if (skipSamePath && to.path == from.path) {return}

            // check if route in ignoreRoutes
            if (ignoreRoutes.includes(to.name)) {return}

            // track page visit
            metrika.hit(to.path)
        })
    })

    .catch(error => {console.error(error)})
}
