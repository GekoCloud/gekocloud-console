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

import { set } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Input, TextArea } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'

export default class ProjectEditModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  get mapper() {
    return {
      name: 'metadata.name',
      aliasName: 'metadata.annotations["kubesphere.io/alias-name"]',
      creator: 'metadata.annotations["kubesphere.io/creator"]',
      description: 'metadata.annotations["kubesphere.io/description"]',
    }
  }

  handleOk = formData => {
    const { onOk } = this.props
    const data = {}
    Object.keys(this.mapper).forEach(key => {
      set(data, this.mapper[key], formData[key])
    })

    onOk(data)
  }

  render() {
    const { detail, visible, onCancel, isSubmitting } = this.props

    const data = {
      ...detail,
    }

    return (
      <Modal.Form
        width={691}
        title={t('Edit Info')}
        icon="pen"
        data={data}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('Project Name')} desc={t('NAME_DESC')}>
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
          <Input name="aliasName" />
        </Form.Item>
        <Form.Item label={t('Creator')} desc={t('PROJECT_ADMIN_DESC')}>
          <Input name="creator" disabled />
        </Form.Item>
        <Form.Item label={t('Description')}>
          <TextArea name="description" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
