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
import { observer, inject } from 'mobx-react'

import SquareButton from '../components/SquareButton'

@inject('monitoringStore')
@observer
export default class SwitchModeButton extends React.Component {
  handleEditClick = () => {
    this.props.monitoringStore.changeModeToEditing()
  }

  render() {
    const { isEditing } = this.props.monitoringStore

    return isEditing ? (
      <SquareButton
        type="danger"
        icon="pen"
        iconType="light"
        onClick={this.props.onSaveClick}
        text={t('Save')}
      >
        {t('SAVE_TEMPLATE')}
      </SquareButton>
    ) : (
      <SquareButton
        type="control"
        icon="pen"
        iconType="light"
        onClick={this.handleEditClick}
      >
        {t('EDIT_TEMPLATE')}
      </SquareButton>
    )
  }
}
