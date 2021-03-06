/*
 * This file is part of Geko Cloud Console.
 * Copyright (C) 2019 The Geko Cloud Console Authors.
 *
 * Geko Cloud Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Geko Cloud Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Geko Cloud Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'
import { AppContainer } from 'react-hot-loader'
import { Loading, LocaleProvider } from '@pitrix/lego-ui'

import { isAppsPage } from 'utils'
import request from 'utils/request'

import Notify from 'components/Base/Notify'

import RootStore from 'stores/root'
import App from './App'
import GlobalValue from './global'
import i18n from './i18n'

require('@babel/polyfill')
require('utils/polyfills')

// request error handler
window.onunhandledrejection = function(e) {
  if (e && (e.status === 'Failure' || e.status >= 400)) {
    if (e.status === 401) {
      // session timeout handler, except app store page.
      if (!isAppsPage()) {
        /* eslint-disable no-alert */
        location.href = `/login?referer=${location.pathname}`
        window.alert(
          t(
            'Session timeout or this account is logged in elsewhere, please login again'
          )
        )
      }
    } else if (globals.config.enableErrorNotify && (e.reason || e.message)) {
      Notify.error({ title: e.reason, content: t(e.message), duration: 6000 })
    }
  }
}

window.t = i18n.t
window.request = request

globals.app = new GlobalValue()

const { locales } = i18n.init()

const store = new RootStore()
const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, store.routing)

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <Suspense fallback={<Loading className="ks-page-loading" />}>
        <LocaleProvider locales={locales} localeKey="lang" ignoreWarnings>
          {component}
        </LocaleProvider>
      </Suspense>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(<App rootStore={store} history={history} />)

module.hot &&
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(<NextApp rootStore={store} history={history} />)
  })
