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

import React, { Component } from 'react'

import { Icon, Dropdown } from '@pitrix/lego-ui'

import { Form } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'

import styles from './index.scss'

export default class ContainerImages extends Component {
  formRef = React.createRef()

  get modifiers() {
    return { computeStyle: { gpuAcceleration: false } }
  }

  handleSubmit = () => {
    const { onOk } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        onOk(form.getData())
      })
  }

  handleCancel = () => {
    this.props.hideEdit()
  }

  handleOpen = () => {
    this.props.showEdit()
  }

  renderContent() {
    const { formData, children } = this.props

    return (
      <div className={styles.form}>
        <Form ref={this.formRef} type="inner" data={formData}>
          <div className={styles.formContent}>{children}</div>
        </Form>
        <Confirm
          className={styles.confirm}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    )
  }

  render() {
    const { title, selected, isEdit } = this.props

    return (
      <Dropdown
        visible={isEdit}
        placement="bottom"
        closeAfterClick={false}
        onOpen={this.handleOpen}
        content={this.renderContent()}
        modifiers={this.modifiers}
        always={isEdit}
      >
        <div>
          {title}
          {selected && (
            <span className={styles.modify}>
              <span>{t('Edit')}</span>
              <Icon type="light" size={20} name="chevron-down" />
            </span>
          )}
        </div>
      </Dropdown>
    )
  }
}
