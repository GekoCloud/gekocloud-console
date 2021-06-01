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

import React from 'react'
import { observer, inject } from 'mobx-react'

import { keyBy } from 'lodash'
import { Alert } from '@juanchi_xd/components'
import UsageCard from './UsageCard'

import styles from './index.scss'

@inject('detailStore', 'projectStore')
@observer
class ResourceStatus extends React.Component {
  get store() {
    return this.props.detailStore
  }

  get clusterMap() {
    return keyBy(this.props.projectStore.detail.clusters, 'name')
  }

  render() {
    const { clusters } = this.store.detail

    return (
      <div className={styles.main}>
        <Alert
          type="warning"
          className="margin-b12"
          message={t.html('VOLUME_MONITORING_TIP')}
        />
        {clusters.map(cluster => (
          <UsageCard
            key={cluster.name}
            match={this.props.match}
            cluster={this.clusterMap[cluster.name] || cluster}
          />
        ))}
      </div>
    )
  }
}

export default ResourceStatus
