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

import { get, keyBy } from 'lodash'
import React, { Component } from 'react'
import { Icon, Tag } from '@juanchi_xd/components'
import StatusReason from 'projects/components/StatusReason'
import { CLUSTER_PROVIDER_ICON, CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'

import styles from './index.scss'

export default class FedWorkloadStatus extends Component {
  render() {
    const { data, clusters, module } = this.props
    const clustersDetail = keyBy(clusters, 'name')

    return (
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          {data.clusters.map(item => {
            const cluster = clustersDetail[item.name]

            if (!cluster) {
              return null
            }

            const resource = get(data, `resources[${cluster.name}]`, {})
            const replicas = get(
              data,
              `clusterTemplates[${cluster.name}].spec.replicas`,
              0
            )
            const { status, reason } = getWorkloadStatus(resource, module)

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
                <span>
                  {resource.availablePodNums || resource.readyPodNums || 0} /{' '}
                  {replicas}
                </span>
                &nbsp;
                {reason && <StatusReason status={status} data={resource} />}
              </Tag>
            )
          })}
        </div>
        <p>
          {t('REPLICAS_AVAILABLE')}/{t('REPLICAS_EXPECTED')}
        </p>
      </div>
    )
  }
}
