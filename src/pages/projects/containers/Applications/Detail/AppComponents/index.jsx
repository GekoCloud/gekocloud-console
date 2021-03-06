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

import { isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { joinSelector } from 'utils'
import RouterStore from 'stores/router'

import AppComponents from 'projects/components/Cards/AppComponents'

import Routes from '../Routes'

import styles from './index.scss'

@observer
class Components extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.routerStore = new RouterStore()
    this.module = props.module

    this.getData()
  }

  getData() {
    const { selector } = toJS(this.store.detail)
    const { namespace } = this.props.match.params

    if (selector) {
      const params = { namespace, labelSelector: joinSelector(selector) }

      this.store.fetchComponents(params)
      this.store.routerStore.fetchListByK8s(params)
    }

    this.routerStore.getGateway({ namespace })
  }

  get prefix() {
    const { namespace } = this.props.match.params
    return `/projects/${namespace}`
  }

  render() {
    const routes = toJS(this.store.routerStore.list.data)
    const components = toJS(this.store.components.data)
    const gateway = toJS(this.routerStore.gateway.data)

    return (
      <div className={styles.main}>
        {!isEmpty(routes) && (
          <Routes
            data={routes}
            gateway={gateway}
            loading={this.store.routerStore.list.isLoading}
            prefix={`${this.prefix}/routes`}
          />
        )}
        <AppComponents
          className="margin-t12"
          data={components}
          loading={this.store.components.isLoading}
          prefix={`${this.prefix}/services`}
        />
      </div>
    )
  }
}

export default Components
