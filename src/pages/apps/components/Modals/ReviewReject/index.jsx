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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, TextArea } from '@juanchi_xd/components'

import { Modal } from 'components/Base'

import styles from './index.scss'

export default class ReviewReject extends Component {
  static propTypes = {
    versionId: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    versionId: '',
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
  }

  handleReject = () =>
    this.formRef.validate(() =>
      this.props.onOk({
        version_id: this.props.versionId,
        message: this.state.message,
      })
    )

  changeMessage = message => {
    this.setState({ message })
  }

  render() {
    const { visible, ...rest } = this.props
    const formData = { message: this.state.message }

    return (
      <Modal
        width={600}
        visible={visible}
        {...rest}
        onOk={this.handleReject}
        footerClassName={styles.footer}
      >
        <Form
          data={formData}
          ref={form => {
            this.formRef = form
          }}
          className={styles.rejectForm}
        >
          <Form.Item
            rules={[
              { required: true, message: t('Please input reject reason') },
            ]}
          >
            <TextArea name="message" onChange={this.changeMessage} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
