'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ROOT_API: '"https://localhost:7103/"',
    API_VERSION: '"api/"',
    BUILD_TARGET: '"DEVELOPMENT"',
})
