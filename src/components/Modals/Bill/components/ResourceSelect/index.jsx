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

import { isEmpty, get, isEqual } from 'lodash'
import { METER_RESOURCE_TITLE } from '../../constats'

export default class ResourceList extends Component {
  state = {
    value: 'cpu',
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeName !== prevProps.activeName ||
      !isEqual(this.props.selectOptions, prevProps.selectOptions)
    ) {
      const option = this.getOptions()
      this.setState({ value: get(option, '[0].value') })
    }
  }

  getOptions = () => {
    const { selectOptions } = this.props
    if (isEmpty(selectOptions)) {
      return []
    }

    const options = Object.keys(selectOptions).map(key => {
      return {
        label: `${t(METER_RESOURCE_TITLE[key])} ${t('Consumption')}`,
        value: key,
      }
    })
    return options
  }

  handleSelect = value => {
    this.setState({ value })
    this.props.getResourceMeterData(value)
  }

  render() {
    const { value } = this.state

    return (
      <div>
        <Select
          onChange={this.handleSelect}
          options={this.getOptions()}
          width="100%"
          style={{ marginBottom: '20px', width: '100%' }}
          value={value}
        />
      </div>
    )
  }
}
