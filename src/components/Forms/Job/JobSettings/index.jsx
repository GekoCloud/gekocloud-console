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
import { get } from 'lodash'
import { Columns, Column } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { NumberInput } from 'components/Inputs'
import { MODULE_KIND_MAP } from 'utils/constants'

export default class JobSettings extends React.Component {
  get prefix() {
    return this.props.prefix || 'spec.'
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('JOB_BACK_OFF_LIMIT_LABEL')}
              desc={t('JOB_BACK_OFF_LIMIT_DESC')}
            >
              <NumberInput
                min={0}
                name={`${this.prefix}backoffLimit`}
                integer
              />
            </Form.Item>
            <Form.Item
              label={t('JOB_PARALLELISM_LABEL')}
              desc={t('JOB_PARALLELISM_DESC')}
            >
              <NumberInput min={0} name={`${this.prefix}parallelism`} integer />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('JOB_COMPLETION_LABEL')}
              desc={t('JOB_COMPLETION_DESC')}
            >
              <NumberInput min={0} name={`${this.prefix}completions`} integer />
            </Form.Item>
            <Form.Item
              label={t('JOB_ACTIVE_DL_SECONDS_LABEL')}
              desc={t('JOB_ACTIVE_DL_SECONDS')}
            >
              <NumberInput
                min={0}
                name={`${this.prefix}activeDeadlineSeconds`}
                integer
              />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
