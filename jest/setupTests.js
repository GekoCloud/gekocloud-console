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

import { configure } from 'enzyme'
import React16Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'

configure({ adapter: new React16Adapter() })

global.t = key => key
global.t.html = key => key

global.request = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}

const doc = new JSDOM('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
global.document.body.createTextRange = function() {
  return {
    setEnd() {},
    setStart() {},
    getBoundingClientRect() {
      return { right: 0 }
    },
    getClientRects() {
      return {
        length: 0,
        left: 0,
        right: 0,
      }
    },
  }
}

global.window.console = {
  warn: () => {},
  log: () => {},
  info: () => {},
  error: () => {},
}

jest.mock('@pitrix/lego-locale', () => ({
  get: key => key,
  getHTML: key => key,
}))
