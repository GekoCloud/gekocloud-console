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

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'
import { Nav } from 'components/Layout'
import Selector from 'projects/components/Selector'

@inject('rootStore', 'projectStore')
@observer
export default class FederatedProjectLayout extends Component {
  get project() {
    return this.props.match.params.namespace
  }

  get routing() {
    return this.props.rootStore.routing
  }

  handleChange = url => this.routing.push(url)

  render() {
    const { match, route, location } = this.props
    const { detail } = this.props.projectStore

    return (
      <div className="ks-page">
        <div className="ks-page-side">
          <Selector
            title={t('Multi-cluster Projects')}
            type="federatedprojects"
            detail={detail}
            workspace={match.params.workspace}
            onChange={this.handleChange}
            isFederated
          />
          <Nav
            className="ks-page-nav"
            navs={globals.app.getFederatedProjectNavs()}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}
