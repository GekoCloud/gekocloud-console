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
import { Icon } from '@juanchi_xd/components'

import { renderRoutes } from 'utils/router.config'
import { Nav } from 'components/Layout'

import styles from './layout.scss'

@inject('rootStore')
@observer
export default class AppsLayout extends Component {
  render() {
    const { match, route, location } = this.props

    return (
      <div className="ks-page-body">
        <div className="ks-page-side">
          <div className={styles.titleWrapper}>
            <div className={styles.icon}>
              <Icon name="openpitrix" size={40} type="light" />
            </div>
            <div className={styles.text}>
              <div className="h6">{t('App Store Management')}</div>
              <p>{t('Platform App Store Management')}</p>
            </div>
          </div>
          <Nav
            className="ks-page-nav"
            navs={globals.app.getManageAppNavs()}
            location={location}
            match={match}
          />
        </div>
        <div className="ks-page-main">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}
