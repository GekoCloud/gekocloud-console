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

import { getLocalTime, getDisplayName } from 'utils'
import VolumeStore from 'stores/volume'

import { Avatar, Card, Status } from 'components/Base'
import BaseTable from 'components/Tables/Base'

import styles from './index.scss'

class Volumes extends React.Component {
  constructor(props) {
    super(props)

    this.volumeStore = props.volumeStore || new VolumeStore()
  }

  get store() {
    return this.props.detailStore
  }

  get storageClassName() {
    return this.store.detail.name
  }

  componentDidMount() {
    this.handleFetch()
  }

  handleFetch = (params = {}) => {
    const { name } = this.store.detail

    if (params.keyword) {
      params.name = params.keyword
      delete params.keyword
    }

    this.volumeStore.fetchList({
      storageClassName: name,
      ...params,
    })
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '18%',
      render: (name, record) => (
        <Avatar icon="storage" title={getDisplayName(record)} noLink />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'phase',
      width: '16%',
      render: phase => (
        <Status type={phase} name={t(`VOLUME_STATUS_${phase.toUpperCase()}`)} />
      ),
    },
    {
      title: t('Capacity'),
      dataIndex: 'capacity',
      width: '16%',
      render: capacity => capacity || '-',
    },
    {
      title: t('Mount Status'),
      dataIndex: 'inUse',
      width: '16%',
      render: inUse => (inUse ? t('Mounted') : t('Not Mounted')),
    },
    {
      title: t('Project'),
      dataIndex: 'namespace',
      key: 'namespace',
      width: '18%',
      customizable: true,
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      width: '16%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const {
      data,
      filters,
      isLoading,
      total,
      page,
      limit,
    } = this.volumeStore.list
    const pagination = { total, page, limit }

    return (
      <Card
        title={t('Volumes')}
        loading={isLoading}
        empty={t('NOT_AVAILABLE', { resource: t('volumes') })}
      >
        <BaseTable
          className={styles.table}
          data={data}
          columns={this.getColumns()}
          searchType="keyword"
          keyword={filters.name}
          placeholder={t('Please input a name to find')}
          pagination={pagination}
          isLoading={isLoading}
          onFetch={this.handleFetch}
        />
      </Card>
    )
  }
}

export default inject('rootStore')(observer(Volumes))
export const Component = Volumes
