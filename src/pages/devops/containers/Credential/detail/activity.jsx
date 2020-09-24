/*
 * This file is part of Smartkube Console.
 * Copyright (C) 2019 The Smartkube Console Authors.
 *
 * Smartkube Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Smartkube Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Smartkube Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import { Table } from '@pitrix/lego-ui'
import { Card } from 'components/Base'

import styles from './index.scss'

@observer
class Events extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  getColumns = () => [
    {
      title: t('name'),
      dataIndex: 'name',
      width: '50%',
    },
    {
      title: t('Record'),
      width: '50%',
      render: record => {
        if (record.ranges) {
          const arr = record.name.split('/')
          const url = `/${this.workspace}/clusters/${this.cluster}/devops/${
            arr[0]
          }/pipelines/${arr[1]}${arr[2] ? `/branch/${arr[2]}` : ''}/activity`
          return (
            <span>
              {record.ranges.ranges.map(range => (
                <Link to={url} key={`${range.start}${range.end}`}>
                  #{range.start}
                  -#
                  {range.end}
                  &nbsp;&nbsp;&nbsp;
                </Link>
              ))}
            </span>
          )
        }
        return '-'
      },
    },
  ]

  render() {
    const { usage, isLoading } = this.props.detailStore
    return (
      <Card title={t('Events')}>
        <Table
          className={styles.table}
          dataSource={toJS(get(usage, 'fingerprint.usage', [])) || []}
          rowKey="name"
          columns={this.getColumns()}
          loading={isLoading}
        />
      </Card>
    )
  }
}

export default Events
