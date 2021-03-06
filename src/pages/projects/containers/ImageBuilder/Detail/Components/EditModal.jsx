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
import PropTypes from 'prop-types'

import { Input } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'

export default class EditModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()
  }

  get mapper() {
    return {
      name: 'metadata.name',
      displayName: 'spec.config.displayName',
    }
  }

  handleOk = () => {
    const { onOk } = this.props
    if (this.form) {
      const current = this.form.current || {}
      const formData = current.getData()

      const data = {
        apiVersion: 'devops.kubesphere.io/v1alpha1',
        kind: 'S2iBuilder',
      }
      Object.keys(this.mapper).forEach(key => {
        set(data, this.mapper[key], formData[key])
      })

      onOk(data)
    }
  }

  render() {
    const { detail, visible, isSubmitting, onCancel } = this.props

    const displayName = get(detail, 'aliasName')

    return (
      <Modal.Form
        formRef={this.form}
        data={detail}
        width={691}
        title={t('Edit Info')}
        icon="pen"
        onOk={this.handleOk}
        okText={t('Update')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('Name')} desc={t('NAME_DESC')}>
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
          <Input name="displayName" defaultValue={displayName} />
        </Form.Item>
      </Modal.Form>
    )
  }
}
