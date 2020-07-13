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
import classNames from 'classnames'
import { get, isEmpty } from 'lodash'
import { List } from 'components/Base'

import Card from './Card'

import styles from './index.scss'

export default class VolumeList extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    containers: PropTypes.array,
    onChange: PropTypes.func,
    onShowAddVolume: PropTypes.func,
    onShowEdit: PropTypes.func,
  }

  static defaultProps = {
    prefix: '',
    name: '',
    value: [],
    containers: [],
    onChange() {},
    onShowAddVolume() {},
    onShowEdit() {},
  }

  static contextTypes = {
    formData: PropTypes.object,
  }

  getFormattedVolumes = () => {
    const { value, containers } = this.props

    if (isEmpty(value) || isEmpty(containers)) {
      return []
    }

    return value.map(item => {
      const volumeMounts = []
      containers.forEach(container => {
        if (container.volumeMounts) {
          const volumeMount = container.volumeMounts.find(
            vm => vm.name === item.metadata.name
          )

          if (volumeMount) {
            volumeMounts.push({
              ...volumeMount,
              containerName: container.name,
            })
          }
        }
      })

      return { ...item, volumeMounts }
    })
  }

  deleteVolumeMounts = name => {
    const { formData } = this.context

    const containers = get(formData, `${this.props.prefix}spec.containers`, [])

    containers.forEach(container => {
      if (!isEmpty(container.volumeMounts)) {
        container.volumeMounts = container.volumeMounts.filter(
          vm => vm.name !== name
        )
      }
    })

    get(formData, `${this.props.prefix}spec.containers`, containers)
  }

  handleAddVolume = () => {
    this.props.onShowAddVolume()
  }

  handleEdit = data => {
    this.props.onShowEdit(data)
  }

  handleDelete = name => {
    const { value, onChange } = this.props

    this.deleteVolumeMounts(name)

    onChange(value.filter(item => item.metadata.name !== name))
  }

  renderAddVolume() {
    return (
      <List.Add
        onClick={this.handleAddVolume}
        title={t('Add Volume Template')}
        description={t('ADD_VOLUME_TEMPLATE_DESC')}
      />
    )
  }

  render() {
    const { className } = this.props
    const formatVolumes = this.getFormattedVolumes()

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={styles.content}>
          {!isEmpty(formatVolumes) && (
            <ul className={styles.list}>
              {formatVolumes.map(volume => (
                <Card
                  volume={volume}
                  key={get(volume, 'metadata.name')}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
                />
              ))}
            </ul>
          )}
          {this.renderAddVolume()}
        </div>
      </div>
    )
  }
}