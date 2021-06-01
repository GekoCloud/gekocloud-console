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
import { Input, Select } from '@juanchi_xd/components'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

export default class ParamInput extends Component {
  handleSelectChange = value => {
    const { name, onChange } = this.props
    onChange(value, name)
  }

  handleNumberChange = value => {
    const { name, onChange } = this.props
    onChange(value, name)
  }

  handleInputChange = e => {
    const { name, onChange } = this.props
    onChange(e.target.value, name)
  }

  render() {
    const { param, ...rest } = this.props

    if (param.options) {
      const options = param.options.map(item => ({ label: item, value: item }))
      return (
        <Select
          options={options}
          {...rest}
          onChange={this.handleSelectChange}
        />
      )
    }

    if (param.type === 'integer') {
      return (
        <NumberInput
          className={styles.number}
          min={param.min}
          unit={param.unit}
          {...rest}
          onChange={this.handleNumberChange}
          showUnit
        />
      )
    }

    return <Input {...rest} onChange={this.handleInputChange} />
  }
}
