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
import { get } from 'lodash'
import { Columns, Column, Input, TextArea } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { MODULE_KIND_MAP } from 'utils/constants'

export default class BaseInfo extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  render() {
    const { formRef } = this.props

    return (
      <div>
        <Form data={this.formTemplate} ref={formRef}>
          <Columns>
            <Column>
              <Form.Item
                label={t('Name')}
                desc={t('storage class name')}
                rules={[{ required: true, message: t('Please input name') }]}
              >
                <Input name="metadata.name" autoFocus={true} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Description')}>
                <TextArea name="metadata.annotations['kubesphere.io/description']" />
              </Form.Item>
            </Column>
          </Columns>
        </Form>
      </div>
    )
  }
}
