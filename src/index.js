import { updateConfig } from './config'
import bootstrap from './bootstrap'

export default function install (Vue, options = {}) {
    updateConfig(options)

    bootstrap(Vue)
}
