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
import { observer, inject } from 'mobx-react'
import { get, isEmpty } from 'lodash'

import { getAreaChartOps } from 'utils/monitoring'
import ComponentMonitorStore from 'stores/monitoring/component'

import { SimpleArea, PercentArea } from 'components/Charts'
import { Controller as MonitoringController } from 'components/Cards/Monitoring'

import styles from './index.scss'

const MetricTypes = {
  request_latencies_total: 'apiserver_request_latencies',
  request_latencies_apis: 'apiserver_request_by_verb_latencies',
  request_rate: 'apiserver_request_rate',
}

@inject('rootStore')
@observer
class APIServerMonitorings extends React.Component {
  constructor(props) {
    super(props)

    this.monitorStore = new ComponentMonitorStore('apiserver')
  }

  fetchData = params => {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }

  get metrics() {
    return this.monitorStore.data
  }

  getSpecificData = (metricName, type, value) => {
    const data =
      get(this.metrics, `${MetricTypes[metricName]}.data.result`) || []
    return data.find(item => get(item, `metric.${type}`) === value) || {}
  }

  getVerbData = value =>
    this.getSpecificData('request_latencies_apis', 'verb', value)

  getMonitoringCfgs = () => [
    {
      type: 'io',
      title: 'Request Latency',
      unit: 'ms',
      legend: [
        'CREATE',
        'DELETE',
        'DELETECOLLECTION',
        'GET',
        'POST',
        'PATCH',
        'PUT',
        'UPDATE',
        'LIST',
        'TOTAL_AVERAGE',
      ],
      data: [
        this.getVerbData('CREATE'),
        this.getVerbData('DELETE'),
        this.getVerbData('DELETECOLLECTION'),
        this.getVerbData('GET'),
        this.getVerbData('POST'),
        this.getVerbData('PATCH'),
        this.getVerbData('PUT'),
        this.getVerbData('UPDATE'),
        this.getVerbData('LIST'),
        get(
          this.metrics,
          `${MetricTypes.request_latencies_total}.data.result[0]`
        ),
      ],
    },
    {
      type: 'request',
      title: 'Request Per Second',
      unit: 'times/s',
      legend: ['Request'],
      data: get(this.metrics, `${MetricTypes.request_rate}.data.result`),
    },
  ]

  renderChart(item) {
    const commonProps = {
      width: '100%',
      height: 190,
    }
    const config = getAreaChartOps(item)

    if (isEmpty(config.data)) return null

    let content = null
    switch (item.type) {
      case 'grade':
        content = <PercentArea {...commonProps} {...config} />
        break
      default:
        content = <SimpleArea {...commonProps} {...config} />
        break
    }

    return (
      <div key={item.title} className={styles.box}>
        {content}
      </div>
    )
  }

  render() {
    const { isLoading, isRefreshing } = this.monitorStore
    const configs = this.getMonitoringCfgs()

    return (
      <MonitoringController
        title={t('APIServer Monitoring')}
        step="2m"
        times={50}
        onFetch={this.fetchData}
        loading={isLoading}
        refreshing={isRefreshing}
        isEmpty={isEmpty(this.metrics)}
      >
        <div className={styles.content}>
          {configs.map(item => this.renderChart(item))}
        </div>
      </MonitoringController>
    )
  }
}

export default APIServerMonitorings