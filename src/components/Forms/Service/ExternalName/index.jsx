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

import { get, set } from 'lodash'
import React from 'react'
import { Input } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { MODULE_KIND_MAP } from 'utils/constants'

export default class ServiceSettings extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  componentDidMount() {
    if (get(this.formTemplate, 'spec.type') !== 'ExternalName') {
      set(this.formTemplate, 'spec', { type: 'ExternalName' })
    }
  }

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Form.Item
          label={t('ExternalName')}
          desc={t('SERVICE_EXTERNAL_NAME_DESC')}
          rules={[
            {
              required: true,
              message: t('Please input ExternalName'),
            },
          ]}
        >
          <Input
            name="spec.externalName"
            placeholder={`${t('Example')}：foo.bar.example.com`}
          />
        </Form.Item>
      </Form>
    )
  }
}
