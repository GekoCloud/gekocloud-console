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
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Form, Modal } from 'components/Base'
import { Input } from '@pitrix/lego-ui'

import styles from './index.scss'

@observer
export default class ArchiveArtifacts extends React.Component {
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
    this.state = { formData: {} }
  }

  static getDerivedStateFromProps(props) {
    if (props.edittingData.type === 'archiveArtifacts') {
      const formData = props.edittingData.data.reduce((prev, arg) => {
        prev[arg.key] = arg.value.value
        return prev
      }, {})
      return { formData }
    }
    return null
  }

  handleOk = () => {
    const formData = this.formRef.current.getData()
    const _arguments = Object.keys(formData).map(key => ({
      key,
      value: { isLiteral: true, value: formData[key] },
    }))
    this.props.onAddStep({
      name: 'archiveArtifacts',
      arguments: _arguments,
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
        title={t('archiveArtifacts')}
      >
        <Form data={this.state.formData} ref={this.formRef}>
          <Form.Item label={t('Artifacts')}>
            <Input name="artifacts" />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
