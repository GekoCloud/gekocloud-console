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

import moment from 'moment-mini'
import React from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from '@juanchi_xd/components'
import { Status, Text } from 'components/Base'
import { getComponentStatus } from 'utils/status'

import styles from './index.scss'

const Card = ({ cluster, component = {} }) => {
  const { name, namespace } = component
  const status = getComponentStatus(component)
  const descKey = `${String(name).toUpperCase()}_DESC`
  const descText = t(descKey)

  return (
    <div className={styles.card} data-test="service-component">
      <Columns>
        <Column>
          <Text
            icon="components"
            title={
              <Link to={`/clusters/${cluster}/components/${namespace}/${name}`}>
                {name}
              </Link>
            }
            description={descText !== descKey ? <p>{descText}</p> : null}
          />
        </Column>
        <Column className="is-2">
          <Text
            title={<Status type={status} name={t(status)} />}
            description={t('Status')}
          />
        </Column>
        <Column className="is-2">
          <Text
            title={`${component.healthyBackends} / ${component.totalBackends}`}
            description={t('Replicas Number')}
          />
        </Column>
        <Column className="is-2">
          <Text
            title={
              component.startedAt
                ? moment(component.startedAt).toNow(true)
                : '-'
            }
            description={t('Running Time')}
          />
        </Column>
      </Columns>
    </div>
  )
}

export default Card
