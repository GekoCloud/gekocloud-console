/*
 * This file is part of Smartkube Console.
 * Copyright (C) 2019 The Smartkube Console Authors.
 *
 * Smartkube Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Smartkube Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Smartkube Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const argv = require('yargs').argv
const semver = require('semver')

// check runtime
if (semver.lt(process.version, '7.6.0')) {
  console.error('Node Version should be greater than 7.6.0')
  process.exit(-1)
}

global.ARGV = argv || {}
global.MODE_DEV = process.env.NODE_ENV === 'development'

const Koa = require('koa')
const path = require('path')

global.APP_ROOT = path.resolve(__dirname, '../')

const { getServerConfig } = require('./libs/utils')

Koa.prototype.apply = function(module, ...rest) {
  module(this, ...rest)
  return this
}

const boot = require('./components/boot')
const locale = require('./components/locale')
const logging = require('./components/logging')
const wsProxy = require('./components/wsProxy')
const errorProcess = require('./components/errorProcess')
const routes = require('./routes')

const app = new Koa()

const serverConfig = getServerConfig().server

global.HOSTNAME = serverConfig.http.hostname || 'localhost'
global.PORT = serverConfig.http.port || 8000

app.keys = ['kubesphere->_<']

app
  .apply(boot)
  .apply(locale)
  .apply(logging)
  .apply(errorProcess)
  .use(routes.routes())

app.server = app.listen(global.PORT, err => {
  if (err) {
    return console.error(err)
  }
  /* eslint-disable no-console */
  console.log(`Dashboard app running at port ${global.PORT}`)
})

app.apply(wsProxy)
