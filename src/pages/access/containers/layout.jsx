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
import { get } from 'lodash'

import { renderRoutes, getIndexRoute } from 'utils/router.config'

import { Nav } from 'components/Layout'
import { Icon } from '@pitrix/lego-ui'

import styles from './layout.scss'

class AccessLayout extends Component {
  render() {
    const { match, route, location } = this.props
    const navs = globals.app.getAccessNavs()
    const indexPath = get(navs, '[0].items[0].name')

    return (
      <>
        <div className="ks-page-side">
          <div className={styles.titleWrapper}>
            <div className={styles.icon}>
              <Icon name="key" size={40} type="light" />
            </div>
            <div className={styles.text}>
              <div className="h6">{t('Access Control')}</div>
              <p>{t('Platform-level Access Control')}</p>
            </div>
          </div>
          <Nav
            className="ks-page-nav"
            navs={navs}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">
          {renderRoutes([
            ...route.routes,
            getIndexRoute({
              path: route.path,
              to: `${route.path}/${indexPath}`,
              exact: true,
            }),
          ])}
        </div>
      </>
    )
  }
}

export default AccessLayout