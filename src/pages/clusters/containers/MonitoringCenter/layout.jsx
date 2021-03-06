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

import React from 'react'

import { Icon } from '@pitrix/lego-ui'
import { renderRoutes } from 'utils/router.config'
import { Nav } from 'components/Layout'

class Layout extends React.Component {
  render() {
    const { match, route, location } = this.props

    return (
      <div>
        <div className="ks-page-side">
          <div className="ks-page-side-title">
            <Icon name="monitor" size={40} />
            <div className="h3">{t('Monitoring Center')}</div>
            <div className="ks-page-side-bottom" />
          </div>
          <Nav
            className="ks-page-nav"
            navs={globals.app.getMonitoringNavs()}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default Layout
