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

import React from 'react'
import { Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'

import Dashboard from 'stores/dashboard'

import styles from './index.scss'

@withList({
  store: new Dashboard(),
  module: 'dashboards',
  authKey: 'custom-monitoring',
  name: 'CustomMonitorDashboard',
})
export default class CustomMonitoringDashboards extends React.Component {
  getColumns() {
    return [
      {
        title: t('Name'),
        dataIndex: 'title',
        render: (_, record) => (
          <Text
            title={
              <div
                className={styles.title}
                onClick={() => this.showEdit(record)}
              >
                {getDisplayName(record)}
              </div>
            }
            description={record.description || '-'}
          />
        ),
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  get itemActions() {
    const { name, trigger } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(name),
            detail: item,
          }),
      },
    ]
  }

  showCreate = () => {
    this.props.trigger('custom.monitoring.create', {
      ...this.props.match.params,
      module: 'dashboards',
    })
  }

  showEdit = detail => {
    this.props.trigger('custom.monitoring.edit', {
      ...this.props.match.params,
      readOnly: !this.props.tableProps.enabledActions.includes('edit'),
      detail,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props

    return (
      <div>
        <ListPage {...this.props}>
          <Banner {...bannerProps} tabs={this.tabs} />
          <Table
            {...tableProps}
            itemActions={this.itemActions}
            columns={this.getColumns()}
            onCreate={this.showCreate}
            searchType="name"
          />
        </ListPage>
      </div>
    )
  }
}
