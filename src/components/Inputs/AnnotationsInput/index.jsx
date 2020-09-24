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
import { AutoComplete } from '@pitrix/lego-ui'
import { PropertiesInput } from 'components/Inputs'
import { INGRESS_ANNOTATIONS } from 'utils/constants'

import styles from './index.scss'

class AutoCompleteWrapper extends React.Component {
  handleSelect = option => {
    const { onChange } = this.props
    onChange(option)
  }

  render() {
    const { onSelected, ...rest } = this.props
    return (
      <AutoComplete onSelected={this.handleSelect} maxVisible={60} {...rest} />
    )
  }
}

export default class AnnotationsInput extends React.Component {
  itemProps = {
    keyProps: {
      component: AutoCompleteWrapper,
      className: styles.dropdown,
      options: INGRESS_ANNOTATIONS,
    },
  }

  render() {
    return <PropertiesInput {...this.props} itemProps={this.itemProps} />
  }
}
