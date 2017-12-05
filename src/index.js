/* istanbul ignore file */
import { updateConfig, checkConfig, loadScript, createMetrika, startTracking } from './helpers'

export default function install (Vue, options = {}) {

    updateConfig(options) // Merge options and default config

    checkConfig() // Check if all required options are presented

    loadScript().then(() => { // Load Metrika script
        metrika = createMetrika(Vue) // Create Metrika
        startTracking(metrika) // Start autotracking
    })
}
