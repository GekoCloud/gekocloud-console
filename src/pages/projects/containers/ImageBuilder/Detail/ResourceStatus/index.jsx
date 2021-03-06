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
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { Component as Base } from 'projects/containers/Deployments/Detail/ResourceStatus'
import PodsCard from 'components/Cards/Pods'
import { Loading } from '@pitrix/lego-ui'

@observer
class JobsResourceStatus extends Base {
  get store() {
    return this.props.s2iRunStore
  }

  renderPods() {
    const { params = {} } = this.props.match
    const { namespace } = params
    const { jobDetail } = this.store
    const jobName = get(jobDetail, 'name')

    return (
      <PodsCard
        prefix={`/projects/${namespace}/jobs/${jobName}`}
        detail={this.store.jobDetail}
      />
    )
  }

  renderContent() {
    const { isLoading } = this.store

    if (isLoading) {
      return <Loading />
    }
    return (
      <div>
        {this.renderContainerPorts()}
        {this.renderPods()}
        {this.renderVolumes()}
      </div>
    )
  }
}

export default JobsResourceStatus
