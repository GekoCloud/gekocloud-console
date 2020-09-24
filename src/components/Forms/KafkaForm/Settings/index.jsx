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
import { Form } from 'components/Base'
import { Input } from '@pitrix/lego-ui'
import Brokers from 'src/components/Forms/KafkaForm/Settings/BrokersInput'

export default class BaseInfo extends React.Component {
  addressValidator = (rule, value, callback) => {
    const brokers = value.split(',')
    const isValid = brokers.every(broker => {
      const [, host = '', port = ''] = broker.match(/(.*):(.*)$/) || []
      return host && port
    })
    return isValid ? callback() : callback({ message: t('URL_SYNTAX_ERROR') })
  }

  render() {
    return (
      <div>
        <Form.Item label={t('topic')}>
          <Input name="topics" autoComplete="nope" />
        </Form.Item>
        <Form.Item
          label={t('Service Address')}
          rules={[
            { required: true, message: t('Please input service address') },
            { validator: this.addressValidator },
          ]}
        >
          <Brokers name="brokers" />
        </Form.Item>
      </div>
    )
  }
}
