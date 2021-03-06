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
import { omit } from 'lodash'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { getLocalTime } from 'utils'

import EmptyCard from '../../EmptyCard'
import Table from '../../Table'

@inject('rootStore')
@observer
export default class Branch extends React.Component {
  constructor(props) {
    super(props)
    this.name = 'Commit'
    this.store = props.detailStore || {}
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
    this.store.getCommits({
      ...params,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  get routing() {
    return this.props.rootStore.routing
  }

  getFilteredValue = dataIndex => this.store.list.filters[dataIndex]

  getColumns = () => [
    {
      title: t('commit'),
      dataIndex: 'commitId',
      width: '20%',
      render: (commitId, record) => (
        <a href={record.url} target="_blank">
          {commitId && commitId.slice(0, 6)}
        </a>
      ),
    },
    {
      title: t('author'),
      dataIndex: 'author',
      width: '20%',
      render: author => author.fullName || '-',
    },
    {
      title: t('message'),
      dataIndex: 'msg',
      width: '40%',
      render: msg => msg,
    },
    {
      title: t('Updated Time'),
      dataIndex: 'timestamp',
      isHideable: true,
      width: '15%',
      render: timestamp =>
        getLocalTime(timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const {
      data,
      filters,
      selectedRowKeys,
      isLoading,
      total,
      page,
      limit,
    } = toJS(this.store.commitsList)

    const isEmptyList = isLoading === false && total === 0

    const omitFilters = omit(filters, 'page')

    if (isEmptyList && !filters.page) {
      return <EmptyCard desc={t('No commit records')} />
    }

    const pagination = { total, page, limit }

    return (
      <Table
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        selectedRowKeys={selectedRowKeys}
        onFetch={this.handleFetch}
        disableSearch
      />
    )
  }
}
