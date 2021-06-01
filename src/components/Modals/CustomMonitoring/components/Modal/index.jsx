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
import { Button } from '@juanchi_xd/components'
import { Modal } from 'components/Base'
import classNames from 'classnames'

import styles from './index.scss'

export default function CustomMonitoringModal({
  title,
  description,
  onCancel,
  children,
  operations,
  className,
}) {
  return (
    <Modal
      fullScreen
      hideFooter
      visible
      title={title}
      description={description}
      icon="monitor"
      className={classNames(styles.wrapper, className)}
      headerClassName={styles.header}
      bodyClassName={styles.body}
      closable={false}
      operations={
        <div className={styles.operations}>
          {operations}
          <Button
            icon="close"
            iconType="light"
            type="control"
            onClick={onCancel}
            className={styles.close}
          />
        </div>
      }
    >
      {children}
    </Modal>
  )
}
