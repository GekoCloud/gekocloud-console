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
import { get } from 'lodash'

import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Modal } from 'components/Base'
import { Input, Alert } from '@pitrix/lego-ui'

import styles from './index.scss'

@observer
export default class withSonarQubeEnv extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    edittingData: PropTypes.object,
  }

  static defaultProps = {
    edittingData: {},
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edittingData.type === 'withSonarQubeEnv') {
      this.formData = {
        name: get(nextProps.edittingData, 'data.value', ''),
      }
    }
  }

  @observable
  formData = {}

  handleOk = () => {
    const current = this.formRef.current || {}
    const formData = current.getData()
    this.formRef.current.validate(() => {
      this.props.onAddStep({
        name: 'withSonarQubeEnv',
        arguments: {
          isLiteral: true,
          value: formData.name,
        },
        children: [],
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
        title={t('withSonarQubeEnv')}
      >
        <Form data={this.formData} ref={this.formRef}>
          <Alert
            type="info"
            className={styles.info}
            message={t(
              'Load the sonarqube configuration provided by Jenkins into the Pipeline'
            )}
          />
          <Form.Item
            label={t('config name')}
            rules={[{ required: true, message: t('This param is required') }]}
            desc={t('sonar is the default config name')}
          >
            <Input name="name" defaultValue={'sonar'} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
