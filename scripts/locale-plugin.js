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

const fs = require('fs')
const path = require('path')
const RawSource = require('webpack-sources/lib/RawSource')

const isDev = process.env.NODE_ENV === 'development'

class LocalePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('LocalePlugin', compilation => {
      const assets = compilation.getAssets()
      assets.forEach(asset => {
        let content = asset.source.source()
        try {
          const obj = eval(content)
          if (obj.default) {
            content = JSON.stringify(
              obj.default.reduce((prev, cur) => ({ ...prev, ...cur }), {})
            )
          }

          if (isDev) {
            if (!fs.existsSync(compiler.outputPath)) {
              fs.mkdirSync(compiler.outputPath)
            }
            fs.writeFileSync(
              path.join(compiler.outputPath, asset.name),
              content
            )
          }
        } catch (error) {}

        compilation.updateAsset(asset.name, new RawSource(content))
      })
    })
  }
}

module.exports = LocalePlugin
