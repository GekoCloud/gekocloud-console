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

import { get } from 'lodash'
import { action, observable } from 'mobx'

import BaseStore from './base'

const URL_PREFIX = 'kapis/devops.kubesphere.io/v1alpha2/devops/'

export default class PipelineRunStore extends BaseStore {
  @observable stepLogData = {
    log: '',
    start: 0,
    hasMore: false,
  }

  async getStepLog({ project_id, name, branch, runid, nodeid, stepid }) {
    const result = await request.defaults({
      url: `${URL_PREFIX}${project_id}/pipelines/${decodeURIComponent(name)}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${runid}/nodes/${nodeid}/steps/${stepid}/log/?start=${this
        .stepLogData.start || 0}`,
      handler: resp => {
        if (resp.status === 200) {
          return resp.text().then(res => ({ data: res, headers: resp.headers }))
        }
      },
    })
    const prevLog = this.stepLogData.log
    this.stepLogData = {
      log: prevLog + get(result, 'data', ''),
      start: result.headers.get('x-text-size'),
      hasMore: Boolean(result.headers.get('x-more-data')),
    }
  }

  @action
  handleResetStepLog = () => {
    this.stepLogData = {
      log: '',
      start: 0,
      hasMore: false,
    }
  }
}
