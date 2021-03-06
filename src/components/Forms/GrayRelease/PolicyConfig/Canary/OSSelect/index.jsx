/*
 * This file is part of Geko Cloud Console.
 * Copyright (C) 2019 The Geko Cloud Console Authors.
 *
 * Geko Cloud Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Geko Cloud Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Geko Cloud Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { BoxSelect } from 'components/Inputs'
import { isEmpty } from 'lodash'

export default class OSSelect extends React.Component {
  getValueFromProps = props => {
    if (!props.value) {
      return []
    }

    return props.value.slice(2, props.value.length - 2).split('|')
  }

  handleChange = value => {
    const { onChange } = this.props

    if (!isEmpty(value)) {
      onChange && onChange(`.*${value.join('|')}.*`)
    } else {
      onChange && onChange('')
    }
  }

  render() {
    const value = this.getValueFromProps(this.props)

    return (
      <BoxSelect {...this.props} value={value} onChange={this.handleChange} />
    )
  }
}
