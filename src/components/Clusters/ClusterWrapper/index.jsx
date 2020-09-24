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

import React, { Component } from 'react'
import { Icon } from '@pitrix/lego-ui'
import { keyBy } from 'lodash'
import { Tag } from 'components/Base'
import { CLUSTER_PROVIDER_ICON, CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'

import styles from './index.scss'

export default class ClusterWrapper extends Component {
  render() {
    const clusterMap = keyBy(this.props.clustersDetail, 'name')
    const { children, clusters = [] } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          {clusters.map(item => {
            const cluster = clusterMap[item.name] || item
            return (
              <Tag
                key={cluster.name}
                type={CLUSTER_GROUP_TAG_TYPE[cluster.group]}
              >
                <Icon
                  name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
                  size={16}
                  type="light"
                />
                {children ? children(cluster) : cluster.name}
              </Tag>
            )
          })}
        </div>
      </div>
    )
  }
}
