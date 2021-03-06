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
import { getValue } from 'utils/yaml'

import EditMode from '../EditMode'

import styles from './index.scss'

const formatData = formTemplate => {
  const { application, ingress, ...components } = formTemplate
  const formattedData = {
    application,
    ingress,
  }

  Object.keys(components).forEach(key => {
    const workloadYAML = getValue('yaml', components[key].workload || {})
    const serviceYAML = getValue('yaml', components[key].service || {})

    formattedData[key] = `${workloadYAML}---\n${serviceYAML}`
  })

  return formattedData
}

export default class CodeMode extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    onOk: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    onOk() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.data = formatData(props.formTemplate)

    this.editor = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formTemplate !== this.data) {
      this.data = formatData(nextProps.formTemplate)
    }
  }

  getData() {
    return this.editor.current.getData()
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <EditMode ref={this.editor} className="height-full" value={this.data} />
      </div>
    )
  }
}
