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
import { Columns, Column, Input } from '@pitrix/lego-ui'
import { Form } from 'components/Base'

import styles from './index.scss'

export default class SELinuxOptions extends React.Component {
  get prefix() {
    return this.props.prefix || 'securityContext'
  }

  render() {
    return (
      <div className="margin-b12">
        <div className={styles.title}>seLinuxOptions</div>
        <div className={styles.content}>
          <Columns>
            <Column>
              <Form.Item label="Level">
                <Input name={`${this.prefix}.seLinuxOptions.level`} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label="Role">
                <Input name={`${this.prefix}.seLinuxOptions.role`} />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item label="Type">
                <Input name={`${this.prefix}.seLinuxOptions.type`} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label="User">
                <Input name={`${this.prefix}.seLinuxOptions.user`} />
              </Form.Item>
            </Column>
          </Columns>
        </div>
      </div>
    )
  }
}
