/*
 * This file is part of SmartKube Console.
 * Copyright (C) 2019 The SmartKube Console Authors.
 *
 * SmartKube Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartKube Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with SmartKube Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const logger = require('koa-logger')
const moment = require('moment-mini')

module.exports = function(app) {
  if (!global.MODE_DEV) {
    app.use(
      logger(str => {
        /* eslint-disable no-console */
        console.log(str, moment().format('YYYY/MM/DDTHH:mm:ss.SSS'))
      })
    )
  }
}
