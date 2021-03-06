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

import { TextArea, Input } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import { updatePipelineParams } from 'utils/devops'
import { get } from 'lodash'

import RepoSelect from 'components/Forms/CICDs/RepoSelect'
import RepoSelectForm from 'components/Forms/CICDs/RepoSelect/subForm'

export default class BaseInfoModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()
    this.scmRef = React.createRef()
    this.state = {
      showSelectRepo: false,
      repo: {},
    }
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({ subRoute: { onSave, onCancel } })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  hideSelectRepo = () => {
    this.setState({ showSelectRepo: false })
  }

  showSelectRepo = () => {
    this.setState({ showSelectRepo: true })
  }

  handleOk = async () => {
    const { onOk } = this.props

    const formData = this.form.current.getData()
    updatePipelineParams(formData)
    await onOk(formData)
    if (this.state.subRoute) {
      this.props.handleScanRepository()
    }
  }

  handleRepoChange = (type, formData) => {
    const { detail = {} } = this.props
    const preConfig = get(detail, 'multi_branch_pipeline', {})
    const sourceKey = `${get(
      detail,
      'multi_branch_pipeline.source_type',
      ''
    )}_source`

    const mergedSource = Object.assign(
      get(detail, `multi_branch_pipeline.${sourceKey}`, {}),
      formData[sourceKey]
    )
    this.setState(
      {
        showSelectRepo: false,
      },
      () => {
        this.scmRef.current.onChange({
          source_type: type,
          ...preConfig,
          ...formData,
          [sourceKey]: mergedSource,
        })
      }
    )
  }

  handleSaveRepo = () => {
    const { subRoute } = this.state
    if (subRoute.onSave) {
      return subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
  }

  render() {
    const { visible, onCancel, detail = {} } = this.props
    const name =
      get(detail, 'pipeline.name', '') ||
      get(detail, 'multi_branch_pipeline.name', '')
    const description =
      get(detail, 'pipeline.description', '') ||
      get(detail, 'multi_branch_pipeline.description', '')

    if (this.state.showSelectRepo) {
      return (
        <Modal
          width={1000}
          hideHeader
          onOk={this.handleSaveRepo}
          visible={visible}
        >
          <RepoSelectForm
            sourceData={detail.multi_branch_pipeline}
            project_id={detail.project_id}
            name={name}
            onSave={this.handleRepoChange}
            onCancel={this.hideSelectRepo}
            enableTypeChange={false}
          />
        </Modal>
      )
    }

    return (
      <Modal
        width={691}
        title={t('Edit Info')}
        icon="pen"
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
      >
        <Form ref={this.form} data={detail}>
          <Form.Item label={t('Name')} desc={t('')}>
            <Input name="name" defaultValue={name} disabled />
          </Form.Item>
          <Form.Item label={t('description')} desc={t('')}>
            <TextArea name="description" defaultValue={description} />
          </Form.Item>
          {detail.multi_branch_pipeline ? (
            <Form.Item label={t('Code Repository')}>
              <RepoSelect
                name="multi_branch_pipeline"
                ref={this.scmRef}
                onClick={this.showSelectRepo}
              />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    )
  }
}
