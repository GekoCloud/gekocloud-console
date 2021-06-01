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

import React, { Component } from 'react'

import { Icon } from '@juanchi_xd/components'

import styles from './index.scss'

export default class ContainerImages extends Component {
  render() {
    const { container, selected, key } = this.props

    return (
      <div key={key}>
        <span>{`${t('Image')}: ${container.image}`}</span>
        {selected && (
          <span className={styles.modify}>
            <span>{t('Edit')}</span>
            <Icon type="light" size={20} name="chevron-down" />
          </span>
        )}
      </div>
    )
  }
}
