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

import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'

import Base from './base'

export default class RouterStore extends Base {
  @observable
  gateway = {
    data: {},
    isLoading: true,
  }

  constructor() {
    super()
    this.module = 'ingresses'
  }

  getGatewayUrl = params =>
    `kapis/resources.kubesphere.io/v1alpha2${this.getPath(params)}/router`

  @action
  async getGateway(params) {
    this.gateway.isLoading = true

    const url = this.getGatewayUrl(params)
    let data = {}

    try {
      const result = await request.get(url, null, null, () => {})
      if (result) {
        data = ObjectMapper.gateway(result)
      }
    } catch (error) {}

    this.gateway.data = data
    this.gateway.isLoading = false
  }

  @action
  addGateway(params, data) {
    return this.submitting(request.post(this.getGatewayUrl(params), data))
  }

  @action
  updateGateway(params, data) {
    return this.submitting(request.put(this.getGatewayUrl(params), data))
  }

  @action
  deleteGateway(params) {
    return this.submitting(request.delete(this.getGatewayUrl(params)))
  }
}
