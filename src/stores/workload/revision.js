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

import { action, observable, toJS } from 'mobx'
import { get } from 'lodash'

import { joinSelector } from 'utils'
import { getCurrentRevision, getWorkloadVolumes } from 'utils/workload'
import ObjectMapper from 'utils/object.mapper'

import Base from 'stores/base'

export default class RevisionStore extends Base {
  @observable
  workloadDetail = {}

  @observable
  currentRevision = 0

  constructor(module) {
    super()
    this.module = module
  }

  getDetailUrl = ({ name, namespace, revision }) =>
    `kapis/resources.kubesphere.io/v1alpha2/namespaces/${namespace}/${
      this.module
    }/${name}/revisions/${revision}`

  @action
  async fetchList({ namespace, name, selector }) {
    this.list.isLoading = true

    const labelSelector = joinSelector(selector)
    const prefix =
      this.module === 'deployments'
        ? `apis/apps/v1/namespaces/${namespace}/replicasets`
        : `apis/apps/v1/namespaces/${namespace}/controllerrevisions`
    const result = await request.get(`${prefix}?labelSelector=${labelSelector}`)

    let data = result.items.map(ObjectMapper.revisions)
    if (this.module === 'deployments') {
      data = data.filter(revision => get(revision, 'ownerName', '') === name)
    }

    this.list.update({
      data,
      isLoading: false,
    })
  }

  @action
  async fetchDetail({ name, namespace, revision }) {
    this.isLoading = true

    const result = await request.get(
      this.getDetailUrl({ name, namespace, revision })
    )
    const detail = ObjectMapper.revisions(result)
    detail.volumes = await getWorkloadVolumes(detail)

    this.detail = detail
    this.isLoading = false
  }

  @action
  async fetchWorkloadDetail({ name, namespace }) {
    const result = await request.get(
      `apis/apps/v1/namespaces/${namespace}/${this.module}/${name}`
    )
    this.workloadDetail = ObjectMapper[this.module](result)
  }

  @action
  async fetchCurrentRevision(workload = {}) {
    await this.fetchList(workload)
    this.currentRevision = getCurrentRevision(
      toJS(workload),
      toJS(this.list.data),
      this.module
    )
  }

  @action
  async scale({ name, namespace }, newReplicas) {
    const data = { spec: { replicas: newReplicas } }
    await request.patch(
      `apis/apps/v1/namespaces/${namespace}/${this.module}/${name}`,
      data
    )
  }

  @action
  async rollBack({ name, namespace, revision }) {
    this.isSubmitting = true

    switch (this.module) {
      default:
      case 'deployments': {
        const params = {
          kind: 'DeploymentRollback',
          apiVersion: 'apps/v1',
          name,
          namespace,
          rollbackTo: { revision },
        }

        await request.post(
          `apis/apps/v1/namespaces/${namespace}/${
            this.module
          }/${name}/rollback`,
          params
        )

        break
      }
      case 'statefulsets':
      case 'daemonsets': {
        const target = await request.get(
          this.getDetailUrl({ name, namespace, revision })
        )

        await request.patch(
          `apis/apps/v1/namespaces/${namespace}/${this.module}/${name}`,
          target.data
        )

        break
      }
    }

    this.isSubmitting = false
  }
}
