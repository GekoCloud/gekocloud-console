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
import { Link } from 'react-router-dom'
import { get, omit } from 'lodash'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { getLocalTime } from 'utils'
import EmptyTable from 'components/Cards/EmptyTable'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'

import Table from '../../Table'

@inject('rootStore')
@observer
export default class Pullrequest extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.detailStore || {}
    this.name = 'PullRequest'
  }

  componentDidMount() {
    const { params } = this.props.match

    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const query = parse(location.search.slice(1))
        this.getData({ ...params, ...query })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  getData(params) {
    this.store.getPullRequest({
      ...params,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get prefix() {
    const { project_id, name } = this.props.match.params
    return `/devops/${project_id}/pipelines/${name}`
  }

  getFilteredValue = dataIndex => this.store.list.filters[dataIndex]

  getColumns = () => [
    {
      title: t('Status'),
      isHideable: true,
      width: '12%',
      render: record => (
        <Status {...getPipelineStatus(get(record, 'latestRun', {}))} />
      ),
    },
    {
      title: t('Name'),
      dataIndex: 'displayName',
      width: '19%',
      render: displayName => (
        <Link
          className="item-name"
          to={`${this.prefix}/branch/${displayName}/`}
        >
          {displayName}
        </Link>
      ),
    },
    {
      title: t('Last message'),
      width: '25%',
      render: record => record.pullRequest.title || '',
    },
    {
      title: t('author'),
      width: '15%',
      render: record => record.pullRequest.author || '',
    },
    {
      title: t('Time'),
      dataIndex: 'latestRun',
      isHideable: true,
      width: '15%',
      render: latestRun =>
        getLocalTime(latestRun.startTime).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  getRowKey = record => record.enQueueTime

  render() {
    const { pullRequestList } = this.store
    const { data, isLoading, total, page, limit, filters } = pullRequestList

    const isEmptyList = isLoading === false && total === 0

    const omitFilters = omit(filters, 'page')

    if (isEmptyList && !filters.page) {
      return <EmptyTable name={this.name} onCreate={this.showCreate} />
    }

    const pagination = { total, page, limit }

    return (
      <Table
        data={toJS(data)}
        columns={this.getColumns()}
        rowKey={'displayName'}
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        disableSearch
      />
    )
  }
}
