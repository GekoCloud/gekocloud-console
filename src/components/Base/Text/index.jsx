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
import { Icon } from '@pitrix/lego-ui'
import { isUndefined } from 'lodash'
import classNames from 'classnames'

import styles from './index.scss'

export default class Text extends React.PureComponent {
  render() {
    const { icon, title, description, className, extra } = this.props

    return (
      <div className={classNames(styles.wrapper, className)}>
        {icon && <Icon className={styles.icon} name={icon} size={40} />}
        <div className={styles.text}>
          <div>{isUndefined(title) || title === '' ? '-' : title}</div>
          <p>{description}</p>
        </div>
        {extra}
      </div>
    )
  }
}
