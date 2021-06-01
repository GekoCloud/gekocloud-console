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

import { isEmpty } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Columns, Column } from '@juanchi_xd/components'
import { toJS, when } from 'mobx'
import { observer, inject } from 'mobx-react'

import { joinSelector } from 'utils'
import EmptyList from 'components/Cards/EmptyList'
import { Component as Base } from 'projects/containers/GrayRelease/Jobs'

import styles from './index.scss'

@inject('detailStore')
@observer
class GrayRelease extends Base {
  constructor(props) {
    super(props)

    this.detailStore = props.detailStore
    this.module = props.module
  }

  componentDidMount() {
    this.disposer = when(
      () => !isEmpty(this.detailStore.detail),
      () => this.getData()
    )
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer()
    }
  }

  get canCreate() {
    const { cluster, workspace, namespace: project } = this.props.match.params
    return globals.app.hasPermission({
      cluster,
      workspace,
      project,
      module: 'grayscale-release',
      action: 'create',
    })
  }

  getData() {
    const { selector } = toJS(this.detailStore.detail)
    const params = {
      namespace: this.namespace,
      cluster: this.cluster,
      labelSelector: joinSelector(selector),
    }
    this.store.fetchList(params).then()
  }

  renderEmpty() {
    return (
      <EmptyList
        icon="istio"
        title={t('NO_GRAY_RELEASE_JOBS_TIP')}
        desc={t('NO_GRAY_RELEASE_JOBS_TIP_2')}
      />
    )
  }

  renderHeader() {
    const { cluster, workspace, namespace } = this.props.match.params

    return (
      <div className={styles.header}>
        <Columns>
          <Column>
            <p className={styles.headerTip}>{t('GRAY_RELEASE_DESC')}</p>
          </Column>
          <Column className="is-narrow">
            <Link
              to={`/${workspace}/clusters/${cluster}/projects/${namespace}/grayrelease/cates`}
            >
              {this.canCreate && (
                <Button type="control">
                  {t('Create Grayscale Release Job')}
                </Button>
              )}
            </Link>
          </Column>
        </Columns>
      </div>
    )
  }
}

export default GrayRelease
