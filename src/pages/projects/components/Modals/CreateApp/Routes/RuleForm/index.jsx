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

import { get, isEmpty } from 'lodash'
import React from 'react'

import PropTypes from 'prop-types'
import { Select, Input, Alert, RadioButton, RadioGroup } from '@pitrix/lego-ui'

import { Modal, Form } from 'components/Base'
import { ArrayInput, RulePath } from 'components/Inputs'

import { PATTERN_HOST } from 'utils/constants'

import ClusterSelect from './ClusterSelect'

export default class RuleForm extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    secrets: PropTypes.array,
    services: PropTypes.array,
    gateway: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    secrets: [],
    services: [],
    gateway: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      type: props.isFederated ? 'specify' : this.getType(props.data),
      service: '',
      protocol: get(props, 'data.protocol', 'http'),
    }

    this.formRef = React.createRef()
  }

  get protocols() {
    return [
      { label: t('http'), value: 'http' },
      { label: t('https'), value: 'https' },
    ]
  }

  get secrets() {
    return this.props.secrets.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get clusters() {
    return get(this.props, 'projectDetail.clusters', []).slice()
  }

  get defaultClusters() {
    return get(this.props, 'projectDetail.clusters', []).map(item => item.name)
  }

  getType(data) {
    const host = get(data, 'host')

    if (!host) {
      return 'auto'
    }

    const { gateway } = this.props
    const service = get(data, 'http.paths[0].backend.serviceName')
    const ip = gateway.defaultIngress
    const namespace = gateway.namespace

    return host === `${service}.${namespace}.${ip}.nip.io` ? 'auto' : 'specify'
  }

  checkItemValid = item =>
    item.path &&
    item.backend &&
    item.backend.serviceName &&
    item.backend.servicePort

  pathValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.some(item => !this.checkItemValid(item))) {
      return callback({ message: t('Invalid paths'), field: rule.field })
    }

    callback()
  }

  handleProtocolChange = value => {
    this.setState({ protocol: value })
  }

  handleModeChange = value => {
    this.setState({ type: value })
  }

  handleSubmit = data => {
    const { onOk } = this.props
    if (this.state.type === 'auto') {
      const { gateway } = this.props
      const service = get(data, 'http.paths[0].backend.serviceName')
      const namespace = gateway.namespace
      onOk({
        ...data,
        protocol: 'http',
        host: gateway.isHostName
          ? gateway.defaultIngress
          : `${service}.${namespace}.${gateway.defaultIngress}.nip.io`,
      })
    } else {
      onOk(data)
    }
  }

  renderForm() {
    const { type, protocol } = this.state
    const { services } = this.props

    return (
      <>
        {type === 'specify' && (
          <>
            <Form.Item
              label={t('HostName')}
              rules={[
                { required: true, message: t('Please input Hostname') },
                {
                  pattern: PATTERN_HOST,
                  message: t('Invalid host'),
                },
              ]}
            >
              <Input name="host" autoFocus={true} />
            </Form.Item>
            <Form.Item label={t('Protocol')}>
              <Select
                name="protocol"
                defaultValue="http"
                onChange={this.handleProtocolChange}
                options={this.protocols}
              />
            </Form.Item>
            {protocol === 'https' && (
              <Form.Item label={t('Secret Name')}>
                <Select name="secretName" options={this.secrets} />
              </Form.Item>
            )}
          </>
        )}
        <Form.Item
          label={t('Paths')}
          rules={[
            { required: true, message: t('Please add a path') },
            { validator: this.pathValidator, checkOnSubmit: true },
          ]}
        >
          <ArrayInput
            name="http.paths"
            itemType="object"
            addText={t('Add Path')}
            checkItemValid={this.checkItemValid}
          >
            <RulePath services={services} />
          </ArrayInput>
        </Form.Item>
      </>
    )
  }

  render() {
    const { data, isFederated } = this.props
    const { type } = this.state

    return (
      <Modal.Form
        title={isEmpty(data) ? t('Add Rule') : t('Edit Rule')}
        width={920}
        {...this.props}
        onOk={this.handleSubmit}
      >
        {isFederated && (
          <Form.Group label={t('Deployment Location')}>
            <Form.Item>
              <ClusterSelect
                name="clusters"
                options={this.clusters}
                defaultValue={this.defaultClusters}
              />
            </Form.Item>
          </Form.Group>
        )}
        <Form.Group label={t('Set Route Rule')}>
          {!isFederated && (
            <Form.Item label={t('Mode')}>
              <RadioGroup
                wrapClassName="radio-default"
                buttonWidth={155}
                value={type}
                onChange={this.handleModeChange}
                size="small"
              >
                <RadioButton value="auto">{t('Auto Generate')}</RadioButton>
                <RadioButton value="specify">{t('Specify Domain')}</RadioButton>
              </RadioGroup>
            </Form.Item>
          )}
          <Alert
            className="margin-t12 margin-b12"
            description={t.html(`RULE_SETTING_MODE_${type.toUpperCase()}`)}
            type="info"
          />
          {this.renderForm()}
        </Form.Group>
      </Modal.Form>
    )
  }
}
