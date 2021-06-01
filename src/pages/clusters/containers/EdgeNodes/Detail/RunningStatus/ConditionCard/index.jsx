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

import { Icon, Tooltip } from '@juanchi_xd/components'
import { getLocalTime } from 'utils'
import { getConditionsStatus, NODE_CONDITION_ICONS } from 'utils/node'
import { Text } from 'components/Base'

import styles from './index.scss'

const ConditionCard = ({ data }) => {
  if (!NODE_CONDITION_ICONS[data.type]) {
    return null
  }

  const statusType = getConditionsStatus(data)

  const content = (
    <div>
      <div className="tooltip-title">{data.reason}</div>
      <p className="tooltip-desc">{data.message}</p>
      <p className="tooltip-desc">
        {t('lastHeartbeatTime')}:{' '}
        {getLocalTime(data.lastHeartbeatTime).format('YYYY-MM-DD HH:mm:ss')}
      </p>
    </div>
  )

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Icon name={NODE_CONDITION_ICONS[data.type]} size={40} />
        <Tooltip content={content}>
          {statusType === 'Running' ? (
            <Icon
              className={styles.check}
              name="check"
              type="light"
              size={12}
            />
          ) : (
            <Icon
              className={styles.substract}
              name="substract"
              type="light"
              size={12}
            />
          )}
        </Tooltip>
      </div>
      <Text
        title={t(`NODE_${data.type.toUpperCase()}`)}
        description={t(`NODE_${data.type.toUpperCase()}_DESC`)}
      />
    </div>
  )
}

export default ConditionCard
