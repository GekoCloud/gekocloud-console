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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import { Modal } from 'components/Base'

import RoleStore from 'stores/role'

import styles from './index.scss'

@observer
export default class RoleDeleteModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    module: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.store = new RoleStore(props.module)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visible &&
      nextProps.visible !== this.props.visible &&
      nextProps.detail.name
    ) {
      this.store.fetchUsers(nextProps.detail)
    }
  }

  render() {
    const { detail, visible, onOk, onCancel, isSubmitting } = this.props
    const { data, isLoading } = toJS(this.store.users)

    return (
      <Modal
        width={504}
        onOk={isLoading || data.length ? null : onOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
        okButtonType="danger"
        hideHeader
      >
        <div className={styles.body}>
          <div className="h5">{t('Sure to delete')}?</div>
          <p>
            {t.html('DELETE_ROLE_TIP', { resource: detail.name })}{' '}
            {!isLoading && data.length
              ? t.html('ROLE_USERS_TIP', { count: data.length })
              : null}
          </p>
        </div>
      </Modal>
    )
  }
}
