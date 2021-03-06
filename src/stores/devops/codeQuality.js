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

import { isArray } from 'lodash'
import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'
import BaseStore from './base'

export default class CodeQualityStore extends BaseStore {
  @observable
  detail = {}
  @observable
  isLoading = true

  @action
  fetchDetail = async ({ project_id, branch, name }) => {
    let url = ''
    if (branch) {
      url = `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}/pipelines/${name}/branches/${encodeURIComponent(
        branch
      )}/sonarstatus `
    } else {
      url = `kapis/devops.kubesphere.io/v1alpha2/devops/${project_id}/pipelines/${name}/sonarstatus`
    }
    this.isLoading = true
    const result = await this.request
      .get(url, null, null, () => 'no  sonarqube')
      .finally(() => {
        this.isLoading = false
      })
    const _result = isArray(result) ? result : []
    this.detail = _result.length ? _result.map(ObjectMapper.codequality)[0] : {}
  }
}
