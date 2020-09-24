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

import React, { Component } from 'react'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router'
import { lazy } from 'utils'
import { renderRoutes } from 'utils/router.config'
import { Provider } from 'mobx-react'

import RootStore from 'stores/root'

import 'scss/main.scss'

import routes from './routes'

const getActions = lazy(() => import('src/actions'))

class App extends Component {
  constructor(props) {
    super(props)

    this.rootStore = new RootStore()
    this.history = syncHistoryWithStore(
      createBrowserHistory(),
      this.rootStore.routing
    )
  }

  componentDidMount() {
    getActions().then(actions =>
      this.rootStore.registerActions(actions.default)
    )
  }

  render() {
    return (
      <Provider rootStore={this.rootStore}>
        <Router history={this.history}>{renderRoutes(routes)}</Router>
      </Provider>
    )
  }
}

export default App
