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

import { get, isEmpty } from 'lodash'
import React from 'react'

import { Tooltip, Icon } from '@pitrix/lego-ui'

import { Status } from 'components/Base'
import { S2I_STATUS_DESC } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'
import styles from './index.scss'

export default function WorkloadStatus({ data, module }) {
  const { status: statusResult } = getWorkloadStatus(data, module) || ''
  if (statusResult.startsWith('S2I')) {
    const S2iStatus = statusResult.slice(4)
    return (
      <div className={styles.status}>
        <Status type={S2iStatus} name={t(S2I_STATUS_DESC[S2iStatus])} flicker />
      </div>
    )
  }

  if (module === 'daemonsets') {
    return (
      <div className={styles.status}>
        <Status
          type={statusResult}
          name={t(statusResult)}
          total={get(data, 'status.desiredNumberScheduled', 0)}
          ready={get(data, 'status.numberAvailable', 0)}
          flicker
        />
      </div>
    )
  }

  return (
    <div className={styles.status}>
      <Status
        type={statusResult}
        name={t(statusResult)}
        total={data.podNums}
        ready={data.readyPodNums}
        flicker
      />
      {!isEmpty(get(data, 'annotations["kubesphere.io/relatedHPA"]')) && (
        <Tooltip
          content={t('Horizontal Pod Autoscaling has been set')}
          trigger="hover"
        >
          <Icon name="timed-task" />
        </Tooltip>
      )}
    </div>
  )
}
