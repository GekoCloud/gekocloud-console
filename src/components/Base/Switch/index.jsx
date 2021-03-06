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

import { isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../Button'
import styles from './index.scss'

export default class Switch extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    type: 'primary',
    checked: false,
    onChange: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      on: props.checked,
    }
  }

  toggleSwitch = () => {
    const on = !this.state.on
    this.props.onChange(on)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.on) {
      this.setState({ on: nextProps.checked })
    }
  }

  render() {
    const { className, disabled, type, text } = this.props
    const { on } = this.state
    const hasText = !isEmpty(text)

    return (
      <Button
        className={classNames(
          styles.wrapper,
          {
            [styles[type]]: on,
          },
          className
        )}
        type="default"
        onClick={this.toggleSwitch}
      >
        <label
          className={classNames(styles.switch, {
            [styles.disabled]: disabled,
            [styles.on]: on,
          })}
        >
          {hasText && <span className={styles.inner}>{text}</span>}
        </label>
      </Button>
    )
  }
}
