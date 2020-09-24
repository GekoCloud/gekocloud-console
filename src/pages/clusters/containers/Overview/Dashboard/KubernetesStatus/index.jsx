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
import React, { Component } from 'react'
import { get } from 'lodash'
import { observer } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'
import { Panel, Text } from 'components/Base'

import { getValueByUnit } from 'utils/monitoring'

import ComponentMonitorStore from 'stores/monitoring/component'

import styles from './index.scss'

const MetricTypes = {
  request_latencies_total: 'apiserver_request_latencies',
  request_rate: 'apiserver_request_rate',
  schedule_attempts_count: 'scheduler_schedule_attempts',
}

@observer
export default class KubernetesStatus extends Component {
  constructor(props) {
    super(props)

    const cluster = props.cluster

    this.apiStore = new ComponentMonitorStore({ module: 'apiserver', cluster })
    this.schedulerStore = new ComponentMonitorStore({
      module: 'scheduler',
      cluster,
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  get metrics() {
    const apiData = this.apiStore.data
    const schedulerData = this.schedulerStore.data
    return {
      ...apiData,
      ...schedulerData,
    }
  }

  fetchData = async (params = {}) => {
    const data = {
      last: true,
      ...params,
    }

    await this.apiStore.fetchMetrics({
      metrics: [MetricTypes.request_latencies_total, MetricTypes.request_rate],
      ...data,
    })

    await this.schedulerStore.fetchMetrics({
      metrics: [MetricTypes.schedule_attempts_count],
      ...data,
    })
  }

  getSpecificData = metricName => {
    const data =
      get(this.metrics, `${MetricTypes[metricName]}.data.result`) || []
    return data.reduce(
      (prev, cur) => ({
        ...prev,
        [get(cur, 'metric.result')]: get(cur, 'value[1]', 0),
      }),
      {}
    )
  }

  render() {
    const metrics = this.metrics

    const request_rate = Number(
      get(metrics, `${MetricTypes.request_rate}.data.result[0].value[1]`, 0)
    ).toFixed(3)
    const request_latencies_total = getValueByUnit(
      get(
        metrics,
        `${MetricTypes.request_latencies_total}.data.result[0].value[1]`
      ),
      'ms'
    )

    const schedule_attempts_count = this.getSpecificData(
      'schedule_attempts_count'
    )

    return (
      <Panel title={t('Kubernetes Status')}>
        <Loading spinning={this.schedulerStore.isLoading}>
          <>
            <div className={styles.level}>
              <Text
                title={`${request_rate} times/s`}
                description={`API ${t('Request Per Second')}`}
              />
              <Text
                title={`${request_latencies_total} ms`}
                description={`API ${t('Request Latency')}`}
              />
            </div>
            <div className={styles.level}>
              <Text
                title={schedule_attempts_count.scheduled}
                description={t('Scheduler Scheduling Times')}
              />
              <Text
                title={schedule_attempts_count.error}
                description={t('Scheduling Failed Pods')}
              />
            </div>
          </>
        </Loading>
      </Panel>
    )
  }
}
