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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { getLocalTime } from 'utils'

import {
  Columns,
  Column,
  Level,
  LevelLeft,
  LevelRight,
  Table,
  Pagination,
} from '@pitrix/lego-ui'
import { Card, Status, Search } from 'components/Base'

import styles from './index.scss'

@inject('rootStore')
@observer
class ExcuteRecords extends React.Component {
  get store() {
    return this.props.detailStore
  }

  get recordStore() {
    return this.props.recordStore
  }

  get excute() {
    return toJS(this.recordStore.excute)
  }

  constructor(props) {
    super(props)

    this.fetchData()
  }

  fetchData = params => {
    const { name, namespace } = this.props.match.params

    if (this.recordStore) {
      this.recordStore.fetchExcuteRecords({ ...params, name, namespace })
    }
  }

  getColumns = () => [
    {
      title: t('No.'),
      dataIndex: 'id',
      width: '7%',
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      width: '19%',
      render: (status, record) => (
        <Status
          type={status}
          name={t(status)}
          ready={record.succeed}
          total={record.desire}
        />
      ),
    },
    {
      title: t('Message'),
      dataIndex: 'messages[0]',
      render: msg => msg || '-',
    },
    {
      title: t('Start Time'),
      dataIndex: 'start-time',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('End Time'),
      dataIndex: 'completion-time',
      render: time =>
        !time || /^0001-01-01/.test(time)
          ? '-'
          : getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  handleSearch = value => {
    this.fetchData(value)
  }

  handlePagination = page => {
    this.fetchData({ page })
  }

  renderTableTitle = () => (
    <div className={styles.nav}>
      <Columns>
        <Column>
          <Search
            name="search"
            placeholder={t('Please input a keyword to filter')}
            onSearch={this.handleSearch}
          />
        </Column>
      </Columns>
    </div>
  )

  renderTableFooter = () => {
    const { total, page, limit } = this.excute

    return (
      <Level>
        <LevelLeft>{t('TOTAL_ITEMS', { num: total })}</LevelLeft>
        <LevelRight>
          <Pagination
            current={page}
            total={total}
            pageSize={limit}
            onChange={this.handlePagination}
          />
        </LevelRight>
      </Level>
    )
  }

  renderTable() {
    const { data, isLoading } = this.excute

    return (
      <Table
        className={styles.table}
        dataSource={data}
        columns={this.getColumns()}
        loading={isLoading}
      />
    )
  }

  render() {
    return (
      <Card className={styles.main} title={t('Excute Records')}>
        <div className={styles.content}>{this.renderTable()}</div>
      </Card>
    )
  }
}

export default ExcuteRecords
