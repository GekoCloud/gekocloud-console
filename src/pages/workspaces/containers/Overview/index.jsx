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
import { observer, inject } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'

import Banner from 'components/Cards/Banner'

import styles from './index.scss'

@inject('rootStore')
@observer
class WorkspaceOverview extends React.Component {
  renderBanner() {
    const { route } = this.props

    return (
      <div className={styles.banner}>
        <Banner
          className={styles.header}
          icon="dashboard"
          title={t('Overview')}
          description={t('WORKSPACE_OVERVIEW_DESC')}
          module={this.module}
          routes={route.routes}
        />
      </div>
    )
  }

  render() {
    const { route } = this.props

    return (
      <div className={styles.wrapper}>
        {this.renderBanner()}
        <div className={styles.main}>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default WorkspaceOverview