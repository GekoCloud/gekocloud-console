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
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Icon } from '@juanchi_xd/components'
import { Card } from 'components/Base'

import styles from './index.scss'

@inject('detailStore')
@observer
class Events extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  getColumns = () => [
    {
      title: t('name'),
      dataIndex: 'name',
      width: '50%',
    },
    {
      title: t('Record'),
      dataIndex: 'record',
      width: '50%',
    },
  ]

  render() {
    const { detail } = this.props.detailStore

    return (
      <Card title={t('Account')}>
        <div className={styles.card_content}>
          <div className={styles.icon}>
            <Icon name="key" size={40} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{detail.id || '-'}</div>
            <div className={styles.desc}>{`${t('type')}: ${t(
              detail.type
            )}`}</div>
          </div>
        </div>
      </Card>
    )
  }
}

export default Events
