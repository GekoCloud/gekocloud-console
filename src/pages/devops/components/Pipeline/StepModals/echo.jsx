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
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { TextArea } from '@pitrix/lego-ui'

import { Modal, Form } from 'components/Base'
import styles from './index.scss'

@observer
export default class Echo extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edittingData.type === 'echo') {
      this.formData = nextProps.edittingData.data.reduce((prev, arg) => {
        prev[arg.key] = arg.value.value
        return prev
      }, {})
    }
  }

  handleOk = () => {
    const formData = this.formRef.current._formData
    this.formRef.current.validate(() => {
      const _arguments = Object.keys(formData).map(key => ({
        key,
        value: {
          isLiteral: true,
          value: formData[key].trim(),
        },
      }))
      this.props.onAddStep({
        name: 'echo',
        arguments: _arguments.filter(arg => arg.value.value !== ''),
      })
    })
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('Print message')}
      >
        <Form data={this.formData} ref={this.formRef}>
          <Form.Item
            label={t('message')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <TextArea name="message" />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
