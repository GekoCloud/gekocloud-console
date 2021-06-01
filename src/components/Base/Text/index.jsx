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
import { Icon } from '@juanchi_xd/components'
import { isUndefined } from 'lodash'
import classNames from 'classnames'

import styles from './index.scss'

export default class Text extends React.PureComponent {
  render() {
    const {
      icon,
      title,
      description,
      className,
      ellipsis,
      extra,
      onClick,
    } = this.props

    return (
      <div
        className={classNames(
          styles.wrapper,
          { [styles.clickable]: !!onClick, [styles.ellipsis]: ellipsis },
          className
        )}
        onClick={onClick}
      >
        {icon && <Icon className={styles.icon} name={icon} size={40} />}
        <div className={styles.text}>
          <div>{isUndefined(title) || title === '' ? '-' : title}</div>
          <div>{description}</div>
        </div>
        {extra}
      </div>
    )
  }
}
