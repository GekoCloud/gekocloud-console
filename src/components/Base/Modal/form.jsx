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

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button, Form } from '@juanchi_xd/components'
import Modal from './modal'

import styles from './index.scss'

export default class ModalForm extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    isSubmitting: PropTypes.bool,
  }

  render() {
    const {
      formRef,
      data,
      children,
      hideFooter,
      onCancel,
      onOk,
      cancelText,
      okText,
      isSubmitting,
      bodyClassName,
      formClassName,
      disableOk,
      ...rest
    } = this.props

    return (
      <Modal
        {...rest}
        bodyClassName={classnames(styles.formBody, bodyClassName)}
        onCancel={onCancel}
        hideFooter
      >
        <Form ref={formRef} data={data} onSubmit={onOk}>
          <div className={classnames(styles.formWrapper, formClassName)}>
            {children}
          </div>
          {!hideFooter && (
            <div className={styles.formFooter}>
              <Button
                type="default"
                onClick={onCancel}
                data-test="modal-cancel"
              >
                {cancelText || t('Cancel')}
              </Button>
              <Button
                type="control"
                htmlType="submit"
                loading={isSubmitting}
                disabled={disableOk || isSubmitting}
                data-test="modal-ok"
              >
                {okText || t('OK')}
              </Button>
            </div>
          )}
        </Form>
      </Modal>
    )
  }
}
