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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { isEmpty } from 'lodash'

import ContainersCard from 'components/Cards/Containers'
import VolumesCard from 'components/Cards/Volumes'

@observer
class PodsResourceStatus extends React.Component {
  get module() {
    return this.props.module
  }

  get store() {
    return this.props.detailStore
  }

  get prefix() {
    return this.props.match.url
      .split('/')
      .slice(0, -1)
      .join('/')
  }

  renderContainers() {
    const { name, containers, initContainers } = toJS(this.store.detail)
    return (
      <ContainersCard
        prefix={this.prefix}
        title={t('Containers')}
        containers={containers}
        initContainers={initContainers}
        podName={name}
      />
    )
  }

  renderVolumes() {
    const { volumes, containers } = toJS(this.store.detail)
    const { namespace } = this.props.match.params

    if (isEmpty(volumes)) return null

    return (
      <VolumesCard
        title={t('Storage Device')}
        volumes={volumes}
        containers={containers}
        loading={this.store.isLoading}
        prefix={`/projects/${namespace}`}
      />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderContainers()}
        {this.renderVolumes()}
      </div>
    )
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default PodsResourceStatus
