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
import Base from 'components/Forms/Workload/ContainerSettings/ContainerList'

export default class ContainerList extends React.Component {
  handleDelete = name => {
    const { value, onChange, onDelete } = this.props

    onChange(
      value.filter(item => item.name !== name && item.name !== 'istio-proxy')
    )
    onDelete && onDelete(name)
  }

  render() {
    const { value = [], isGovernance } = this.props
    let newValue = value
    if (isGovernance === 'true') {
      newValue = [
        {
          name: 'istio-proxy',
          image: 'istio/proxyv2:1.0.0',
        },
        ...value,
      ]
    }

    return (
      <Base
        {...this.props}
        readOnlyList={['istio-proxy']}
        value={newValue}
        onDelete={this.handleDelete}
      />
    )
  }
}
