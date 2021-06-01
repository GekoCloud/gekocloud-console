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

import { isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@juanchi_xd/components'

import Item from './Item'
import ArrayInput from '../ArrayInput'

export default class EnvironmentInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    name: '',
    onChange() {},
    configMaps: [],
    secrets: [],
  }

  handleAddRef = () => {
    const { value, onChange } = this.props
    if (isEmpty(value)) {
      return onChange([{ name: '', valueFrom: {} }])
    }

    if (value.length === 1 && value[0].name === '' && value[0].value === '') {
      return onChange([{ name: '', valueFrom: {} }])
    }

    if (value.every(this.checkItemValid)) {
      return onChange([...value, { name: '', valueFrom: {} }])
    }
  }

  checkItemValid = item =>
    !isEmpty(item) &&
    !isEmpty(item.name) &&
    (!isEmpty(item.value) || !isEmpty(item.valueFrom))

  render() {
    const { configMaps, secrets, ...rest } = this.props

    return (
      <ArrayInput
        itemType="object"
        checkItemValid={this.checkItemValid}
        addText={t('Add Environment Variable')}
        extraAdd={
          <Button onClick={this.handleAddRef} data-test="add-env-configmap">
            {t('Use ConfigMap or Secret')}
          </Button>
        }
        {...rest}
      >
        <Item configMaps={configMaps} secrets={secrets} />
      </ArrayInput>
    )
  }
}
