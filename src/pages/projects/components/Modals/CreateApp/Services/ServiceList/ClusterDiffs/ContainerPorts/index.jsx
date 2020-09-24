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

import React, { Component } from 'react'

import styles from './index.scss'

export default class ContainerPorts extends Component {
  render() {
    const { container } = this.props

    return (
      <div>
        <div>{`${t('Image')}: ${container.image}`}</div>
        {container.ports &&
          container.ports.map((port, index) => (
            <div key={index} className={styles.port}>
              <span>{`${t('Protocol')}: ${port.protocol}`}</span>
              <span>{`${t('Name')}: ${port.name}`}</span>
              <span>{`${t('Container Port')}: ${port.containerPort}`}</span>
              <span>{`${t('Service Port')}: ${port.servicePort}`}</span>
            </div>
          ))}
      </div>
    )
  }
}
