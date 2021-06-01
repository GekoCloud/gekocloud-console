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
import classNames from 'classnames'

import { Icon } from '@juanchi_xd/components'

import styles from './index.scss'

export default class Confirm extends React.PureComponent {
  render() {
    const { className, onOk, okText, onCancel, cancelText } = this.props
    return (
      <div className={classNames(styles.wrapper, className)}>
        <div
          className={styles.button}
          onClick={onCancel}
          data-test="confirm-cancel"
        >
          {cancelText || <Icon name="close" type="light" />}
        </div>
        <div className={styles.button} onClick={onOk} data-test="confirm-ok">
          {okText || <Icon name="check" type="light" />}
        </div>
      </div>
    )
  }
}
