import { merge } from './helpers'

const defaultConfig = {id: null, router: null}
let config = { ...defaultConfig }

export function updateConfig (params) {
    merge(config, params)
}

export default config
