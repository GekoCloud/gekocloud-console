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
import { observer } from 'mobx-react'
import { Form, Select } from '@juanchi_xd/components'
import Base from 'components/Forms/Workload/ContainerSettings'

@observer
export default class PodTemplate extends Base {
  getRestartPolicyOptions() {
    return [
      {
        label: `Never (${t('RESTART_POLICY_NEVER_DESC')})`,
        value: 'Never',
      },
      {
        label: `OnFailure (${t('RESTART_POLICY_ONFAILURE_DESC')})`,
        value: 'OnFailure',
      },
    ]
  }

  renderRestartPolicy() {
    return (
      <Form.Item
        label={t('Restart Policy')}
        tip={t.html('RESTART_POLICY_TIP')}
        desc={`${t('Restart Policy')} (Never/OnFailure)`}
      >
        <Select
          name={`${this.prefix}spec.restartPolicy`}
          options={this.getRestartPolicyOptions()}
        />
      </Form.Item>
    )
  }

  render() {
    const { formRef } = this.props
    const { showContainer, selectContainer } = this.state

    if (showContainer) {
      return this.renderContainerForm(selectContainer)
    }

    return (
      <Form data={this.formTemplate} ref={formRef}>
        {this.renderRestartPolicy()}
        {this.renderContainerList()}
      </Form>
    )
  }
}
