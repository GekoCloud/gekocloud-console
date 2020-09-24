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

import React from 'react'
import { Columns, Column } from '@pitrix/lego-ui'
import { Form, CheckableText } from 'components/Base'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

export default class UserGroup extends React.Component {
  get prefix() {
    return this.props.prefix || 'securityContext'
  }

  render() {
    return (
      <div className="margin-b12">
        <div className={styles.title}>{t('User and User Group')}</div>
        <div className={styles.content}>
          <Form.Item>
            <CheckableText
              name={`${this.prefix}.runAsNonRoot`}
              title={t('RUN_AS_NON_ROOT')}
              description={t('RUN_AS_NON_ROOT_DESC')}
            />
          </Form.Item>
          <div className="padding-12">
            <Columns>
              <Column>
                <Form.Item label={t('User')} desc={t('RUN_AS_USER_DESC')}>
                  <NumberInput name={`${this.prefix}.runAsUser`} integer />
                </Form.Item>
              </Column>
              <Column>
                <Form.Item
                  label={t('User Group')}
                  desc={t('RUN_AS_USER_GROUP_DESC')}
                >
                  <NumberInput name={`${this.prefix}.runAsGroup`} integer />
                </Form.Item>
              </Column>
            </Columns>
          </div>
        </div>
      </div>
    )
  }
}
