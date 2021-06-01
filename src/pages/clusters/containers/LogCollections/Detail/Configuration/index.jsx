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
import { get } from 'lodash'

import { Panel } from 'components/Base'
import Attributes from 'core/containers/Base/Detail/BaseInfo/Attributes'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Configuration extends React.Component {
  render() {
    const detail = get(this.props.detailStore, 'detail', {})
    const { address, config = {}, type } = detail

    return (
      <Panel>
        <Attributes className={styles.attributes}>
          {type === 'kafka' && (
            <Attributes.Item
              className={styles.item}
              name={t('topic')}
              value={config.topics}
            />
          )}
          <Attributes.Item
            className={styles.item}
            name={t('Address')}
            value={address}
          />
          {type === 'es' && (
            <Attributes.Item
              className={styles.item}
              name={t('Index Prefix')}
              value={config.logstashPrefix}
            />
          )}
        </Attributes>
      </Panel>
    )
  }
}
