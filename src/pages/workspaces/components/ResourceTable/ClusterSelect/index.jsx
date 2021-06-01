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
import { Select } from '@juanchi_xd/components'
import StatusReason from 'clusters/components/StatusReason'

import styles from './index.scss'

export default class ClusterSelect extends Component {
  valueRenderer = option => `${t('Cluster')}: ${option.value}`

  optionRenderer = option => (
    <div>
      <div>{option.value}</div>
      {!option.cluster.isReady && (
        <div>
          <StatusReason data={option.cluster} noTip />
        </div>
      )}
    </div>
  )

  render() {
    const { cluster, clusters, onChange } = this.props

    return (
      <Select
        className={styles.select}
        value={cluster}
        onChange={onChange}
        options={clusters}
        valueRenderer={this.valueRenderer}
        optionRenderer={this.optionRenderer}
      />
    )
  }
}
