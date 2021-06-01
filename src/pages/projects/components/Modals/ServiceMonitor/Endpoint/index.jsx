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
import { get, omit } from 'lodash'
import { Select, Input, Icon } from '@juanchi_xd/components'
import { ObjectInput } from 'components/Inputs'
import Authorization from '../Authorization'
import styles from './index.scss'

export default class Endpoints extends Component {
  get protocols() {
    return [
      {
        label: 'HTTPS',
        value: 'https',
      },
      {
        label: 'HTTP',
        value: 'http',
      },
    ]
  }

  get ports() {
    return get(this.props, 'detail.ports', []).map(item => ({
      label: item.name ? `${item.name}(${item.port})` : item.port,
      value: item.name || item.port,
    }))
  }

  render() {
    return (
      <ObjectInput {...this.props}>
        <Select
          className={styles.schema}
          name="scheme"
          options={this.protocols}
          defaultValue="http"
        />
        <Select
          prefixIcon={<Icon name="network-card" />}
          name="port"
          options={this.ports}
        />
        <Input name="path" defaultValue="/metrics" />
        <Authorization
          name="authType"
          formData={this.props.value}
          {...omit(this.props, ['value', 'onChange'])}
        />
      </ObjectInput>
    )
  }
}
