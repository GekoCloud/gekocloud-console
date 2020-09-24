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
import { isEmpty, isUndefined } from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { RadioButton, RadioGroup, Badge } from '@pitrix/lego-ui'

export default class RadioGroupWithOptions extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  render() {
    const { value, options, onChange, ...rest } = this.props

    if (isEmpty(options)) {
      return null
    }

    return (
      <RadioGroup
        wrapClassName={classNames('radio-default', {
          'radio-with-badge': options.every(
            option => !isUndefined(option.count)
          ),
        })}
        value={value}
        onChange={onChange}
        size="small"
        {...rest}
      >
        {options
          .filter(option => !option.hidden)
          .map(option => (
            <RadioButton key={option.value} value={option.value}>
              {option.label}
              {!isUndefined(option.count) && (
                <Badge
                  status={option.value === value ? 'success' : 'default'}
                  count={Number(option.count)}
                />
              )}
            </RadioButton>
          ))}
      </RadioGroup>
    )
  }
}
