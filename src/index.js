import { updateConfig, checkOptions, loadScript, createMetrika, startTracking } from './helpers'

export default function install (Vue, options = {}) {

    updateConfig(options) // Merge options and default config

    checkOptions() // Check if all required options are presented

    loadScript().then(() => { // Load Metrika script
        metrika = createMetrika(Vue) // Create Metrika
        startTracking(metrika) // Start autotracking
    })
}
