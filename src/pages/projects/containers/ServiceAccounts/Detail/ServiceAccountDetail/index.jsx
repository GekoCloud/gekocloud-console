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

import Secret from './Secret'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class ServiceAccountDetail extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.module
  }

  render() {
    const { detail } = this.store
    const secrets = get(detail, 'secrets')
    const serviceAccountName = get(detail, 'name')

    return (
      <div>
        <div className={styles.secretWrapper}>
          {secrets.map(({ name }) => (
            <Secret
              secret={name}
              serviceAccountName={serviceAccountName}
              key={name}
              {...this.props}
            />
          ))}
        </div>
      </div>
    )
  }
}
