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
import { EnvironmentInput } from 'components/Inputs'

export default class Environments extends React.Component {
  static defaultProps = {
    prefix: '',
  }

  get prefix() {
    const { prefix } = this.props

    return prefix ? `${prefix}.` : ''
  }

  render() {
    const { configMaps, secrets } = this.props
    return (
      <Form.Group
        label={t('Environment Variables')}
        desc={t('CONTAINER_ENVIROMENT_DESC')}
        checkable
      >
        <Form.Item>
          <EnvironmentInput
            name={`${this.prefix}env`}
            configMaps={configMaps}
            secrets={secrets}
          />
        </Form.Item>
      </Form.Group>
    )
  }
}
