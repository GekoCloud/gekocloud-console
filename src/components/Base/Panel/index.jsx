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

import { Loading } from '@juanchi_xd/components'

import styles from './index.scss'

export default class Panel extends React.Component {
  render() {
    const { className, title, loading = false, children, extras } = this.props
    const empty = (
      <div className={styles.empty}>
        {t('NOT_AVAILABLE', { resource: title })}
      </div>
    )

    return (
      <div
        className={styles.wrapper}
        data-test={`panel-${
          title
            ? title
                .toLowerCase()
                .split(' ')
                .join('-')
            : 'default'
        }`}
      >
        {title && <div className={styles.title}>{title}</div>}
        <div className={classNames(styles.panel, className)}>
          {loading ? <Loading className={styles.loading} /> : children || empty}
        </div>
        {extras}
      </div>
    )
  }
}
