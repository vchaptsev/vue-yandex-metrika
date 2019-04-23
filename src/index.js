/* istanbul ignore file */
import { updateConfig, checkConfig, loadScript, createMetrika, startTracking } from './helpers'

export default function install (Vue, options = {}) {

    updateConfig(options) // Merge options and default config

    checkConfig() // Check if all required options are presented

    loadScript(() => { // Load Metrika script
        const metrika = createMetrika(Vue) // Create Metrika
        startTracking(metrika) // Start autotracking
    }, options.scriptSrc)
}
