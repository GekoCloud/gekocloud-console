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
import PropTypes from 'prop-types'
import { isString, isArray } from 'lodash'
import { TextArea } from '@juanchi_xd/components'

const defaultStringify = value => (isArray(value) ? value.join(',') : '')
const defaultParser = value =>
  isString(value)
    ? value.split(',').map(str => {
        if (/^["'].*["']$/.test(str)) {
          str = str.slice(1, str.length - 1)
        }
        return str
      })
    : []

export default class StringInput extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    stringify: PropTypes.func,
    parser: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    stringify: defaultStringify,
    parser: defaultParser,
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.stringify(props.value),
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this.props.value) {
      this.setState({ value: this.props.stringify(this.props.value) })
    }
  }

  handleChange = value => {
    const { onChange, parser } = this.props

    this.setState({ value })
    onChange(parser(value))
  }

  render() {
    const { value, onChange, parser, stringify, ...rest } = this.props

    return (
      <TextArea
        value={this.state.value}
        {...rest}
        onChange={this.handleChange}
        rows={2}
      />
    )
  }
}
