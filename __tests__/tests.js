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
    it ('should throw an error if the routes are missing', () => {
        expect(() => {
            Vue.use(VueYandexMetrika, {id: 1})
        }).toThrowError()
    })
})


describe('checkConfig', () => {
    it ('should pass checkConfig', () => {
        expect(() => {
            Vue.use(VueYandexMetrika, {id: 1, router: router, productionOnly: false})
        }).not.toThrowError()
    })
})


describe('updateConfig', () => {
    it ('env by default', () => {
        process.env.NODE_ENV = ''
        helpers.updateConfig({})
        process.env.NODE_ENV = 'test' // restore default value
        expect(config.env).toBe('production')
    })
})


describe('updateConfig', () => {
    it ('env from process.env', () => {
        helpers.updateConfig({})
        expect(config.env).toBe('test')
    })
})


describe('updateConfig', () => {
    it ('env from plugin options', () => {
        helpers.updateConfig({env: 'plugin'})
        expect(config.env).toBe('plugin')
    })
})


describe('tracking', () => {
    it ('productionOnly', () => {
        helpers.updateConfig({id: 1, router: router, productionOnly: true, env: 'development'})
        expect(helpers.createMetrika(Vue)).toBe(undefined)
    })
})


describe('tracking', () => {
    it ('skipSamePath', () => {
        helpers.updateConfig({id: 1, router: router, productionOnly: false})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
        router.push('/init') // init
        router.push('/init#samePath') // triggers samePath
    })
})


describe('tracking', () => {
    it ('ignoreRoutes', () => {
        helpers.updateConfig({id: 1, router: router, productionOnly: false, ignoreRoutes: ['test']})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
        router.push('/init') // init
        router.push('/test') // triggers ignoreRoutes
    })
})


describe('tracking', () => {
    it ('metrika.hit', () => {
        helpers.updateConfig({id: 1, router: router, productionOnly: false})
        var metrika = helpers.createMetrika(Vue)
        helpers.startTracking(metrika)
        router.push('/init') // init
        router.push('/test') // triggers hit
    })
})
