import { update } from './config'
import bootstrap from './bootstrap'

export default function install (Vue, options = {}) {
    update(options)
    bootstrap()
}
