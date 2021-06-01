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
import { Form, Select } from '@juanchi_xd/components'

import styles from './index.scss'

class LogCollectionStatusForm extends Component {
  statusLabel = [
    {
      label: t('Activate'),
      value: 1,
    },
    {
      label: t('Close'),
      value: 0,
    },
  ]

  render() {
    return (
      <div>
        <p className={styles.tip}>{t('LOG_COLLECTION_ENABLE_TIPS')}</p>
        <Form.Item>
          <Select name="enabled" options={this.statusLabel} />
        </Form.Item>
      </div>
    )
  }
}

export default LogCollectionStatusForm
