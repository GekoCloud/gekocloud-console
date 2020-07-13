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

import { get } from 'lodash'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { getDocsUrl } from 'utils'
import { renderRoutes } from 'utils/router.config'

import ApplicationStore from 'stores/application/crd'

import Banner from 'components/Cards/Banner'
import ServiceDeployAppModal from 'projects/components/Modals/CreateApp'

@inject('rootStore')
@observer
class GrayRelease extends React.Component {
  state = {
    showDeployApp: false,
    sampleApp: '',
  }

  store = new ApplicationStore()

  get tips() {
    return [
      {
        title: t('PREREQUEST_FOR_USE_GRAYRELEASE_Q'),
        description: t('PREREQUEST_FOR_USE_GRAYRELEASE_A'),
        more: getDocsUrl('composingapps'),
      },
    ]
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get canDeployComposingApp() {
    const { namespace: project } = this.props.match.params

    const canCreateDeployment = globals.app
      .getActions({
        module: 'deployments',
        project,
      })
      .includes('create')

    const canCreateService = globals.app
      .getActions({
        module: 'services',
        project,
      })
      .includes('create')

    const canCreateApp = globals.app
      .getActions({
        module: 'applications',
        project,
      })
      .includes('edit')

    return canCreateApp && canCreateDeployment && canCreateService
  }

  hideDeployAppModal = () => {
    this.setState({ showDeployApp: false, sampleApp: '' })
  }

  handleDeployApp = data => {
    const { namespace } = this.props.match.params
    this.store.create(data).then(() => {
      this.hideDeployAppModal()
      this.routing.push(
        `/projects/${namespace}/applications/composing/${get(
          data,
          'application.metadata.name'
        )}`
      )
    })
  }

  showDeploySampleApp = () => {
    this.setState({
      showDeployApp: true,
      sampleApp: 'bookinfo',
    })
  }

  render() {
    const { route } = this.props
    const { showDeployApp, sampleApp } = this.state
    const { namespace } = this.props.match.params

    return (
      <div>
        <Banner
          icon="bird"
          module="grayrelease"
          title={t('Grayscale Release')}
          description={t('GRAY_RELEASE_DESC')}
          tips={this.tips}
          routes={route.routes}
        />
        {renderRoutes(route.routes)}
        <ServiceDeployAppModal
          store={this.store}
          visible={showDeployApp}
          namespace={namespace}
          sampleApp={sampleApp}
          onOk={this.handleDeployApp}
          onCancel={this.hideDeployAppModal}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }
}

export default GrayRelease