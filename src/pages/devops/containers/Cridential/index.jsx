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
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import { parse } from 'qs'
import { omit } from 'lodash'

import CridentialStore from 'stores/devops/cridential'
import EmptyTable from 'components/Cards/EmptyTable'
import { getLocalTime } from 'utils'

import Banner from 'components/Cards/Banner'
import CICDTable from '../Pipelines/Table'
import CreateModal from './credentialModal'
import styles from './index.scss'

@inject('rootStore')
@observer
class Credential extends React.Component {
  constructor(props) {
    super(props)

    this.store = new CridentialStore()

    this.formTemplate = {}

    this.state = {
      showCreate: false,
      showEdit: false,
      showDelete: false,
      showBranchModal: false,
      configFormData: {},
      selectPipeline: {},
    }
  }

  componentDidMount() {
    const { namespace } = this.props.match.params
    this.store.project_id = namespace
    this.unsubscribe = this.routing.history.subscribe(location => {
      const params = parse(location.search.slice(1))
      this.getData(params)
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'credentials',
      project: this.props.match.params.project_id,
    })
  }

  getData(params) {
    const { project_id } = this.props.match.params
    this.store.fetchList({
      project_id,
      ...params,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  get prefix() {
    if (this.props.match.url.endsWith('/')) {
      return this.props.match.url.slice(0, -1)
    }
    return this.props.match.url
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get module() {
    return 'cridentials'
  }

  get name() {
    return 'Credentials'
  }

  showCreate = () => {
    this.setState({ showCreate: true })
  }

  hideCreate = () => {
    this.setState({ showCreate: false })
  }

  hideDelete = () => {
    this.setState({ showDelete: false })
  }

  handleCreate = () => {
    this.setState({ showCreate: false, showEdit: true })
    this.handleFetch()
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'id',
      width: '24%',
      render: id => (
        <Link
          className="item-name"
          to={`${this.prefix}/${encodeURIComponent(id)}`}
        >
          {id}
        </Link>
      ),
    },
    {
      title: t('Type'),
      dataIndex: 'type',
      width: '25%',
      render: type => t(type),
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      render: description => description,
      width: '25%',
    },
    {
      title: t('Created Time'),
      dataIndex: 'create_time',
      width: 20,
      render: create_time =>
        getLocalTime(create_time).format(`YYYY-MM-DD HH:mm:ss`),
    },
  ]

  renderContent() {
    const { data, filters, isLoading, total, page, limit } = toJS(
      this.store.list
    )

    const isEmptyList = isLoading === false && total === 0

    const omitFilters = omit(filters, 'page')

    const showCreate = this.enabledActions.includes('create')
      ? this.showCreate
      : null

    if (isEmptyList && Object.keys(filters).length <= 0) {
      return (
        <EmptyTable
          desc={t(`${this.name.toUpperCase()}_CREATE_DESC`)}
          onCreate={showCreate}
          createText={t('Create credentials')}
        />
      )
    }

    const pagination = { total, page, limit }
    return (
      <CICDTable
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        pagination={pagination}
        rowKey="fullName"
        isLoading={isLoading}
        onFetch={this.handleFetch}
        onCreate={showCreate}
      />
    )
  }

  renderModals() {
    const { project_id } = this.props.match.params
    return (
      <CreateModal
        visible={this.state.showCreate}
        onOk={this.handleCreate}
        onCancel={this.hideCreate}
        project_id={project_id}
      />
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Banner
          title={t('DevOps Credentials')}
          icon="key"
          description={t('DEVOPS_PROJECT_CREDENTIALS_DESC')}
          module={this.module}
        />
        {this.renderContent()}
        {this.renderModals()}
      </div>
    )
  }
}

export default Credential
