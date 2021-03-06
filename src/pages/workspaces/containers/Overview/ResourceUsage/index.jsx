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
import { inject } from 'mobx-react'

import ResourceStatistics from './Statistics'
import PhysicalResource from './Physical'
import VirtualResource from './Virtual'

@inject('rootStore')
class ResourceUsage extends React.Component {
  get workspace() {
    return this.props.match.params.workspace
  }

  renderResourceCount() {
    return <ResourceStatistics workspace={this.workspace} />
  }

  renderPhysicalResource() {
    return <PhysicalResource workspace={this.workspace} />
  }

  renderVirtualResource() {
    return <VirtualResource workspace={this.workspace} />
  }

  render() {
    return (
      <div>
        {this.renderResourceCount()}
        {this.renderPhysicalResource()}
        {this.renderVirtualResource()}
      </div>
    )
  }
}

export default ResourceUsage
