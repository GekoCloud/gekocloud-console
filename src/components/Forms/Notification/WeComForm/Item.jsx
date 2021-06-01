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

import { Tag, Icon } from '@juanchi_xd/components'

import styles from './index.scss'

export default class Item extends Component {
  render() {
    const { resources, type, title, onDelete } = this.props
    if (resources.length <= 0) {
      return null
    }
    return (
      <div className={styles.wrapper}>
        <p>{title}</p>
        <div className={styles.listWrapper}>
          {resources.map(item => {
            return (
              <Tag className={styles.tag} type="primary" key={item}>
                {item}
                <Icon
                  name="close"
                  size={12}
                  clickable
                  onClick={() => onDelete(type, item)}
                ></Icon>
              </Tag>
            )
          })}
        </div>
      </div>
    )
  }
}
