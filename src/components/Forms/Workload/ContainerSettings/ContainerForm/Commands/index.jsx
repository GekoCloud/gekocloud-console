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
import { Form } from 'components/Base'
import { StringInput } from 'components/Inputs'

import styles from './index.scss'

export default class Commands extends React.Component {
  static defaultProps = {
    prefix: '',
  }

  get prefix() {
    const { prefix } = this.props

    return prefix ? `${prefix}.` : ''
  }

  render() {
    return (
      <Form.Group
        label={t('Start command')}
        desc={t('START_COMMAND_DESC')}
        checkable
      >
        <Form.Item label={t('Run cammand')} desc={t('RUN_COMMAND_DESC')}>
          <StringInput
            className={styles.input}
            name={`${this.prefix}command`}
            placeholder={t('Command')}
          />
        </Form.Item>
        <Form.Item label={t('Parameters')} desc={t('CONTAINER_PARAMS_DESC')}>
          <StringInput
            className={styles.input}
            name={`${this.prefix}args`}
            placeholder={t('Argument')}
          />
        </Form.Item>
      </Form.Group>
    )
  }
}
