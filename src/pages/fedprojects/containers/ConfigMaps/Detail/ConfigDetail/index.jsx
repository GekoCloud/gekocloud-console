/*
 * This file is part of Smartkube Console.
 * Copyright (C) 2019 The Smartkube Console Authors.
 *
 * Smartkube Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Smartkube Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Smartkube Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { observer, inject } from 'mobx-react'

import { Card } from 'components/Base'

import styles from './index.scss'

@inject('detailStore')
@observer
class ConfigMapDetail extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.module
  }

  renderContent(data = {}) {
    return (
      <div className={styles.wrapper}>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <div className="h6">{key}</div>
              <pre className={styles.value}>{value}</pre>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const { detail, isLoading } = this.store

    return (
      <Card title={t('Config Value')} loading={isLoading}>
        {this.renderContent(detail.data)}
      </Card>
    )
  }
}

export default ConfigMapDetail
