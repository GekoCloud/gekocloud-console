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

import React, { Component } from 'react'

import { isEmpty } from 'lodash'

import Rule from 'fedprojects/containers/Routes/Detail/ResourceStatus/Rule'

import styles from './index.scss'

export default class IngressCard extends Component {
  render() {
    const { prefix, gateway, detail } = this.props

    const tls = detail.tls[0] || {}

    if (isEmpty(detail.rules)) {
      return null
    }

    return (
      <div className={styles.wrapper}>
        {detail.rules.map(rule => (
          <Rule
            key={rule.host}
            tls={tls}
            rule={rule}
            gateway={gateway}
            prefix={prefix}
          />
        ))}
      </div>
    )
  }
}