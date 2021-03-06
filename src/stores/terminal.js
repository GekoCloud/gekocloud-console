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

import { observable, action, computed } from 'mobx'
import { get, assign } from 'lodash'

export default class TerminalStore {
  username = get(globals, 'user.username', '')

  @computed
  get kubeWebsocketUrl() {
    const { namespace, pod, container, shell = 'sh' } = this.kubectl
    return `kapis/terminal.kubesphere.io/v1alpha2/namespaces/${namespace}/pods/${pod}?container=${container}&shell=${shell}`
  }

  @observable
  kubectl = {
    namespace: '',
    pod: '',
    container: '',
    shell: 'bash',
    isLoading: false,
  }

  @observable
  kubeconfig = ''

  @observable
  connected = false

  constructor(props) {
    assign(this.kubectl, props)
  }

  @action
  async fetchKubeCtl() {
    this.kubectl.isLoading = true
    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2/users/${this.username}/kubectl`,
      null,
      null,
      this.reject
    )
    this.kubectl = {
      ...result,
      isLoading: false,
    }
  }

  @action
  async fetchKubeConfig() {
    const result = await request.get(
      `kapis/resources.kubesphere.io/v1alpha2/users/${this.username}/kubeconfig`
    )
    this.kubeconfig = result
  }

  @action
  connect() {
    this.connected = true
  }

  @action
  disconnect() {
    this.connected = false
  }

  reject = res => {
    this.kubectl.isLoading = false
    window.onunhandledrejection(res)
  }
}
