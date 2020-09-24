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
import { Modal, Button } from 'components/Base'
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
      /**
       * make opertaions in one div
       */
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
            data-test="modal-close"
          />
        </div>
      }
    >
      {children}
    </Modal>
  )
}
