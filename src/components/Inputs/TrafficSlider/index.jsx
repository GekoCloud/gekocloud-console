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

import { isUndefined } from 'lodash'
import React from 'react'
import { Slider } from '@pitrix/lego-ui'

import styles from './index.scss'

const SLIDER_PROPS = {
  className: styles.slider,
  railStyle: {
    height: 30,
    backgroundColor: '#7eb8dc',
    borderRadius: 2,
  },
  handleStyle: {
    width: 14,
    height: 30,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 0,
    border: 'none',
  },
  trackStyle: { height: 30, borderRadius: 2, backgroundColor: '#F18918' },
}

export default class TrafficSlider extends React.PureComponent {
  static defaultProps = {
    defaultValue: 50,
  }

  render() {
    const { leftContent, rightContent, defaultValue, ...rest } = this.props
    const value = isUndefined(rest.value) ? defaultValue : rest.value

    return (
      <div className={styles.wrapper}>
        <Slider
          min={0}
          max={100}
          defaultValue={value}
          {...rest}
          {...SLIDER_PROPS}
        />
        <span
          className={styles.floatContent}
          style={{
            left: `${Math.floor(value / 2)}%`,
            maxWidth: `${value}%`,
          }}
        >
          {`${leftContent} ${value}%`}
        </span>
        <span
          className={styles.floatContent}
          style={{
            left: `${Math.floor(value / 2) + 50}%`,
            maxWidth: `${100 - value}%`,
          }}
        >
          {`${rightContent} ${100 - value}%`}
        </span>
      </div>
    )
  }
}
