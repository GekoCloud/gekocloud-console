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
import { toJS } from 'mobx'
import classnames from 'classnames'
import { get, cloneDeep } from 'lodash'

import Confirm from 'components/Forms/Base/Confirm'

import styles from './index.scss'

const EnhanceWrapper = function(Component) {
  return class WrapperComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        showFormActions: false,
        formData: cloneDeep(toJS(props.formData)),
      }

      this.initialState = cloneDeep(this.state)
    }

    get name() {
      return this.props.name
    }

    get formTemplate() {
      const target = this.props.templatePrefix
        ? `formData.${this.props.templatePrefix}`
        : 'formData'
      return get(this.state, target, {})
    }

    get formProps() {
      return {
        onChange: this.handleFormChange,
      }
    }

    handleFormChange = () => {
      this.setState({
        showFormActions: true,
      })
    }

    handleSaveChange = () => {
      const { formRef, onSaveChange } = this.props
      const form = get(formRef, 'current')

      form &&
        form.validate(() => {
          this.setState({ showFormActions: false }, () => {
            onSaveChange && onSaveChange(this.name, this.state.formData)
            this.prevState = {
              ...this.state,
              formData: cloneDeep(this.state.formData),
            }
          })
        })
    }

    handleCancelChange = () => {
      const prevState = this.prevState || this.initialState

      this.setState({
        ...prevState,
      })
    }

    renderFormActions() {
      return (
        <Confirm
          className={classnames(styles.formActions, {
            [styles.active]: this.state.showFormActions,
          })}
          okText={t('Save')}
          cancelText={t('Undo')}
          onOk={this.handleSaveChange}
          onCancel={this.handleCancelChange}
        />
      )
    }

    render() {
      const { module, formRef } = this.props
      return (
        <div className={styles.formWrapper}>
          <Component
            formTemplate={this.formTemplate}
            formProps={this.formProps}
            formRef={formRef}
            module={module}
          />
          {this.renderFormActions()}
        </div>
      )
    }
  }
}

export default EnhanceWrapper