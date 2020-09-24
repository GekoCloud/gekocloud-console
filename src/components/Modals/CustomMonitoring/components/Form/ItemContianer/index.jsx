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
import { get, debounce } from 'lodash'

export default class FormItemContainer extends React.Component {
  state = {
    value: this.props.value,
  }

  handleChange = newValue => {
    const value = get(newValue, 'currentTarget.value', newValue)
    this.setState({ value })

    this.change(value)
  }

  change = debounce(value => {
    this.props.onChange(value)
  }, this.props.debounce)

  render() {
    const { children, value, onChange, ...props } = this.props
    return children({
      ...props,
      value: this.state.value,
      onChange: this.handleChange,
    })
  }
}