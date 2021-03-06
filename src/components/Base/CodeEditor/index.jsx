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

import React, { lazy, Suspense, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isObject } from 'lodash'
import { Loading } from '@pitrix/lego-ui'

import { getValue, getValueObj } from 'utils/yaml'

import styles from './index.scss'

const AceEditor = lazy(() =>
  import(/* webpackChunkName: "react-ace" */ './AceEditor')
)

class CodeEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    mode: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    mode: 'yaml',
    options: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    const { mode, value } = props

    this.state = {
      value: getValue(mode, value),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mode, value } = nextProps

    if (
      nextProps.mode !== this.props.mode &&
      nextProps.value !== this.props.value
    ) {
      if (isObject(value)) {
        this.setState({ value: getValue(mode, value) })
      } else {
        const newValue = getValue(mode, getValueObj(this.props.mode, value))
        this.setState({ value: newValue })
      }
    } else if (nextProps.mode !== this.props.mode) {
      const newValue = getValue(
        mode,
        getValueObj(this.props.mode, this.state.value)
      )
      this.setState({ value: newValue })
    } else if (nextProps.value !== this.props.value) {
      this.setState({ value: getValue(mode, value) })
    }
  }

  handleChange = value => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { className, mode, options } = this.props
    const { value } = this.state

    return (
      <Suspense fallback={<Loading className="ks-page-loading" />}>
        <AceEditor
          {...options}
          className={classnames(styles.editor, className)}
          value={value}
          mode={mode}
          onChange={this.handleChange}
        />
      </Suspense>
    )
  }
}

export default CodeEditor
