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

import { observable, action } from 'mobx'
import Store from './index'

const sort_metric_options = [
  'namespace_cpu_usage',
  'namespace_memory_usage_wo_cache',
  'namespace_pod_count',
  'namespace_net_bytes_received',
  'namespace_net_bytes_transmitted',
]

const metrics_filter = [
  'namespace_memory_usage_wo_cache',
  'namespace_memory_limit_hard',

  'namespace_cpu_usage',
  'namespace_cpu_limit_hard',

  'namespace_pod_count',
  'namespace_pod_count_hard',

  'namespace_net_bytes_received',
  'namespace_net_bytes_transmitted',
]

export default class NodeStore extends Store {
  @observable
  workspace

  @observable
  sort_metric_options = sort_metric_options

  @observable
  sort_metric = sort_metric_options[0]

  @observable
  metrics_filter = metrics_filter.join('|')

  get fetchUrl() {
    return `${this.apiVersion}/${this.resource}/${this.workspace}/namespaces`
  }

  @action
  changeWorkSpace = ws => {
    this.workspace = ws
    this.fetchAll()
  }

  resource = 'workspaces'
}
