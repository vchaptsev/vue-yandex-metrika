import Vue from 'vue'
import VueRouter from 'vue-router'
import VueYandexMetrika from '../src/index'

import config from '../src/config'
import * as helpers from '../src/helpers'

Vue.use(VueRouter)
const routes = [
    {name: 'main', path: '/init', component: {render: h => h('div')}},
    {name: 'test', path: '/test', component: {render: h => h('div')}}
]
const router = new VueRouter({mode: 'hash', routes})

// Yandex Metrika mock
global.Ya = {Metrika() {return {hit() {return}}}}


describe('checkConfig', () => {
    it ('should throw an error if the Metrika id is missing', () => {
        expect(() => {
            Vue.use(VueYandexMetrika, {})
        }).toThrowError()
    })
})

describe('checkConfig', () => {
    it ('manualMode notification', () => {
        Vue.use(VueYandexMetrika, {id: 1})
    })
})


describe('checkConfig', () => {
    it ('should pass checkConfig', () => {
        expect(() => {
            Vue.use(VueYandexMetrika, {id: 1, router})
        }).not.toThrowError()
    })
})


describe('updateConfig', () => {
    it ('env by default', () => {
        helpers.updateConfig({})
        expect(config.env).toBe('development')
    })
})


describe('updateConfig', () => {
    it ('env from plugin options', () => {
        helpers.updateConfig({env: 'plugin'})
        expect(config.env).toBe('plugin')
    })
})


describe('tracking', () => {
    it ('manualMode', () => {
        helpers.updateConfig({id: 1})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
    })
})


describe('tracking', () => {
    it ('debug', () => {
        helpers.updateConfig({id: 1, router, debug: true})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
    })
})

describe('tracking', () => {
    it ('development', () => {
        helpers.updateConfig({id: 1, router, debug: false})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
    })
})

describe('tracking', () => {
    it ('production', () => {
        helpers.updateConfig({id: 1, router, env: 'production'})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
    })
})


describe('tracking', () => {
    it ('skipSamePath', () => {
        helpers.updateConfig({id: 1, router})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
        router.push('/init') // init
        router.push('/init#samePath') // triggers samePath
    })
})


describe('tracking', () => {
    it ('ignoreRoutes', () => {
        helpers.updateConfig({id: 1, router, ignoreRoutes: ['test']})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
        router.push('/init') // init
        router.push('/test') // triggers ignoreRoutes
    })
})


describe('tracking', () => {
    it ('metrika.hit', () => {
        helpers.updateConfig({id: 1, router})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
        router.push('/init') // init
        router.push('/test') // triggers hit
    })
})
