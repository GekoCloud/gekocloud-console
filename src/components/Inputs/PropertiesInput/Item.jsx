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
import { Input } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import ObjectInput from '../ObjectInput'
import styles from './index.scss'

export default class PropertyItem extends React.Component {
  handleChange = value => {
    const { index, onChange } = this.props
    onChange(index, value)
  }

  handleDelete = () => {
    const { index, onDelete } = this.props
    onDelete(index)
  }

  render() {
    const {
      readOnly,
      onDelete,
      onChange,
      keyProps = {},
      valueProps = {},
      ...rest
    } = this.props

    const { component: KeyInput = Input, ...keyInputProps } = keyProps
    const { component: ValueInput = Input, ...valueInputProps } = valueProps

    return (
      <div className={styles.item}>
        <ObjectInput {...rest} onChange={this.handleChange}>
          <KeyInput
            name="key"
            placeholder={t('key')}
            readOnly={readOnly}
            {...keyInputProps}
          />
          <ValueInput
            name="value"
            placeholder={t('value')}
            readOnly={readOnly}
            {...valueInputProps}
          />
        </ObjectInput>
        {!readOnly && (
          <Button
            type="flat"
            icon="trash"
            className={styles.delete}
            onClick={this.handleDelete}
          />
        )}
      </div>
    )
  }
}
