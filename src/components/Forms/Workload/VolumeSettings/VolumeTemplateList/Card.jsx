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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@juanchi_xd/components'
import { List } from 'components/Base'

import styles from './index.scss'

const Card = ({ volume, onDelete, onEdit }) => {
  const handleDelete = () => onDelete(volume.metadata.name)
  const handleEdit = () => onEdit(volume)

  const details = [
    {
      title: get(volume, 'spec.resources.requests.storage', '-'),
      description: t('Capacity'),
    },
    {
      title: get(volume, 'spec.accessModes[0]', '-'),
      description: t('Access Mode'),
    },
  ]

  const mount = (
    <div className={styles.mount}>
      <ul>
        {volume.volumeMounts &&
          volume.volumeMounts.map(
            ({ containerName, mountPath, subPath, readOnly }) => (
              <li key={mountPath}>
                <div>
                  <Icon name="docker" size={20} />
                  <span>{containerName}</span>
                </div>
                <div>
                  <Icon name="mgmt-node" size={20} /> <span>{mountPath}</span>
                  <span className="text-secondary">
                    &nbsp;({readOnly ? t('ReadOnly') : t('ReadAndWrite')})
                  </span>
                </div>
                {subPath && (
                  <div>
                    <Icon name="textfield" size={20} /> <span>{subPath}</span>
                  </div>
                )}
              </li>
            )
          )}
      </ul>
    </div>
  )

  return (
    <List.Item
      icon="storage"
      title={get(volume, 'metadata.name', '-')}
      description={`${t('Storage Classs')}: ${get(
        volume,
        'spec.storageClassName',
        '-'
      )}`}
      extras={mount}
      details={details}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  )
}

Card.propTypes = {
  container: PropTypes.object,
}

export default Card
