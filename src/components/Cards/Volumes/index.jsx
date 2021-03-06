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
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { Panel } from 'components/Base'
import VolumeItem from './Item'

import styles from './index.scss'

export default class VolumesCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    volumes: PropTypes.array,
    containers: PropTypes.array,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    volumes: [],
    containers: [],
    loading: true,
  }

  getVolumeMounts = volume => {
    const { containers } = this.props
    const mounts = []

    containers.forEach(container => {
      if (!isEmpty(container.volumeMounts)) {
        container.volumeMounts.forEach(mount => {
          if (mount.name === volume.mountName) {
            mounts.push({
              ...mount,
              containerName: container.name,
              accessMode: mount.readOnly ? 'read-only' : 'read-write',
            })
          }
        })
      }
    })
    return mounts
  }

  renderContent() {
    const { volumes, prefix } = this.props

    if (isEmpty(volumes)) return null

    return volumes.map((item, index) => {
      item.volumeMounts = this.getVolumeMounts(item)
      return <VolumeItem key={index} volume={item} prefix={prefix} />
    })
  }

  render() {
    const { className } = this.props
    const title = this.props.title || t('Volumes')

    return (
      <Panel className={className} title={title}>
        <div className={styles.wrapper}>{this.renderContent()}</div>
      </Panel>
    )
  }
}
