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
import PropTypes from 'prop-types'
import { debounce, pick } from 'lodash'

import { Select, Input, Group } from '@pitrix/lego-ui'

import styles from './index.scss'

const RESERVED_KEYS = ['cookie', 'User-Agent']

export default class HeaderMatch extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = this.getStateFromProps(props)
  }

  componentWillReceiveProps(nextProps) {
    const nextState = this.getStateFromProps(nextProps)
    if (
      nextState.key !== this.state.key ||
      nextState.match !== this.state.match ||
      nextState.value !== this.state.value
    ) {
      return this.setState(nextState)
    }
  }

  getStateFromProps(props) {
    const keys = Object.keys(props.value).filter(
      item => !RESERVED_KEYS.includes(item)
    )
    const key = keys[0]
    const match = (key ? Object.keys(props.value[key])[0] : 'exact') || 'exact'
    const value = (key ? Object.values(props.value[key])[0] : '') || ''

    return { key, match, value }
  }

  get matchTypes() {
    return [
      { label: t('Exact Match'), value: 'exact' },
      { label: t('Regex Match'), value: 'regex' },
    ]
  }

  triggerChange = debounce(() => {
    const { match, key, value } = this.state
    const { onChange, value: propsValue } = this.props

    onChange({ [key]: { [match]: value }, ...pick(propsValue, RESERVED_KEYS) })
  }, 200)

  handleMatchChange = value => {
    this.setState({ match: value }, () => {
      this.triggerChange()
    })
  }

  handleKeyChange = (e, value) => {
    this.setState({ key: value }, () => {
      this.triggerChange()
    })
  }

  handleValueChange = (e, value) => {
    this.setState({ value }, () => {
      this.triggerChange()
    })
  }

  render() {
    const { match, key, value } = this.state
    return (
      <Group className={styles.match}>
        <Select
          value={match}
          defaultValue="exact"
          options={this.matchTypes}
          onChange={this.handleMatchChange}
        />
        <Input value={key} placeholder="key" onChange={this.handleKeyChange} />
        <Input
          value={value}
          placeholder="value"
          onChange={this.handleValueChange}
        />
      </Group>
    )
  }
}