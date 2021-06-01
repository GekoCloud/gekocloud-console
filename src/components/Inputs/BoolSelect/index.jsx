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
import { Select } from '@juanchi_xd/components'

const BOOLEAN_OPTIONS = [
  { label: 'true', value: 'true' },
  { label: 'false', value: 'false' },
]

export default class BoolSelect extends React.Component {
  static defaultProps = {
    options: BOOLEAN_OPTIONS,
  }

  handleChange = (value, option) => {
    const { onChange } = this.props
    onChange && onChange(value && value === 'true', option)
  }

  render() {
    const { value, onChange, ...rest } = this.props
    return (
      <Select value={String(value)} onChange={this.handleChange} {...rest} />
    )
  }
}
