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

import { isEmpty, isUndefined, endsWith, trimEnd, debounce } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Select } from '@pitrix/lego-ui'

import NumberInput from '../NumberInput'

import styles from './index.scss'

const MEMORY_UNITS = [
  { label: 'Ki', value: 'Ki' },
  { label: 'Mi', value: 'Mi' },
  { label: 'Gi', value: 'Gi' },
  { label: 'Ti', value: 'Ti' },
]

export default class MemoryInput extends React.PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    onChange() {},
  }

  constructor(props) {
    super(props)

    const [value, unit] = this.getValueAndUnit(String(props.value))

    this.state = { value, unit }
  }

  componentWillReceiveProps(nextProps) {
    const [value, unit] = this.getValueAndUnit(String(nextProps.value))
    if (value !== this.state.value || unit !== this.state.unit) {
      this.setState({ value, unit })
    }
  }

  getValueAndUnit = value => {
    if (!isEmpty(value)) {
      for (let i = 0; i < MEMORY_UNITS.length; i++) {
        const unit = MEMORY_UNITS[i].value
        if (endsWith(value, unit)) {
          return [trimEnd(value, unit), unit]
        }
      }
    }

    return ['', 'Mi']
  }

  triggerChange = debounce(() => {
    const { onChange } = this.props
    const { value, unit } = this.state

    if (isUndefined(value) || isEmpty(String(value))) {
      onChange('')
    } else {
      onChange(`${value}${unit}`)
    }
  }, 200)

  handleValueChange = value => {
    this.setState({ value }, () => {
      this.triggerChange()
    })
  }

  handleUnitChange = unit => {
    this.setState({ unit }, () => {
      this.triggerChange()
    })
  }

  render() {
    const { prefix } = this.props
    const { value, unit } = this.state

    return (
      <div className={styles.wrapper}>
        {prefix && <div className={styles.text}>{prefix}</div>}
        <NumberInput
          className={classNames({
            [styles.prefix]: !!prefix,
          })}
          onChange={this.handleValueChange}
          value={value}
        />
        <Select
          name="unit"
          className={styles.select}
          value={unit}
          onChange={this.handleUnitChange}
          defaultValue={unit || 'Mi'}
          options={MEMORY_UNITS}
        />
      </div>
    )
  }
}
