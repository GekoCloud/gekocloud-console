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
import { Input, Select } from '@pitrix/lego-ui'
import { ObjectInput, SelectInput } from 'components/Inputs'

export default class RulePath extends React.Component {
  static defaultProps = {
    value: {},
    onChange() {},
  }

  state = {
    service: '',
  }

  componentWillReceiveProps(nextProps) {
    const service = get(nextProps, 'value.backend.serviceName')
    if (service && service !== this.state.service) {
      this.setState({ service })
    }
  }

  get services() {
    return this.props.services.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get ports() {
    const service = this.props.services.find(
      item => item.name === this.state.service
    )
    return service
      ? service.ports.map(port => ({
          label: port.port,
          value: port.port,
        }))
      : []
  }

  handleChange = value => {
    const { onChange } = this.props

    const servicePort = get(value, 'backend.servicePort')

    if (!isNaN(Number(servicePort))) {
      set(value, 'backend.servicePort', Number(servicePort))
    }

    onChange && onChange(value)
  }

  handleServiceChange = value => {
    this.setState({ service: value })
  }

  render() {
    return (
      <ObjectInput {...this.props} onChange={this.handleChange}>
        <Input name="path" placeholder={t('Path')} defaultValue="/" />
        <Select
          name="backend.serviceName"
          placeholder={t('Please select a service')}
          options={this.services}
          onChange={this.handleServiceChange}
        />
        <SelectInput
          name="backend.servicePort"
          placeholder={t('port')}
          options={this.ports}
        />
      </ObjectInput>
    )
  }
}
