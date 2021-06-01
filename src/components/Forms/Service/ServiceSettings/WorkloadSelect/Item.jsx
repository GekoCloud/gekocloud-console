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
import { ICON_TYPES } from 'utils/constants'

import styles from './index.scss'

export default class WorkloadItem extends React.Component {
  handleClick = () => {
    const { onClick, detail } = this.props
    onClick(detail)
  }

  render() {
    const { module, detail, selected } = this.props
    return (
      <div
        className={classNames(styles.item, { [styles.selected]: selected })}
        onClick={this.handleClick}
      >
        <Icon name={ICON_TYPES[module]} size={16} />
        <div className={styles.ring} />
        <span className={styles.name}>{detail.name}</span>
      </div>
    )
  }
}
