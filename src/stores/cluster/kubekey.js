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

import { get } from 'lodash'
import { action, observable } from 'mobx'

import { safeParseJSON } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import Base from 'stores/base'

export default class KubeKeyClusterStore extends Base {
  module = 'clusters'

  @observable
  parameters = {}

  get apiVersion() {
    return 'apis/kubekey.kubesphere.io/v1alpha1'
  }

  get mapper() {
    return ObjectMapper.kkclusters
  }

  @action
  async fetchParameters() {
    const result = await request.get(
      `api/v1/namespaces/kubekey-system/configmaps/kubekey-parameters`,
      {},
      {},
      () => {}
    )
    this.parameters = safeParseJSON(
      get(result, "data['parameters.json']", ''),
      {}
    )
  }
}
