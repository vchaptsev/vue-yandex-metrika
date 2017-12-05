const blueJest = require('blue-jest')

module.exports = Object.assign({}, blueJest, {
    moduleNameMapper: Object.assign({}, blueJest.moduleNameMapper, {'vue$': 'vue/dist/vue.min.js'})
})
