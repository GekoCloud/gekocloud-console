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

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import { get } from 'lodash'
import EditMonitorFormLayou from '../components/EditMonitorFormLayout'
import { GraphTextInput } from '../components/FormInput'
import { SingleStatGraph } from '../components/Graph'
import FormGroupCard from '../components/FormGroupCard'
import SingleStatDataForm from '../components/Form/SingleStatData'
import ErrorContainer from '../components/ErrorContainer'

@inject('monitoringStore')
@observer
export default class TextMonitorForm extends Component {
  @computed
  get monitor() {
    return this.props.monitor
  }

  @computed
  get supportMetrics() {
    return this.props.monitoringStore.targetsMetadata.map(metadata => ({
      value: metadata.metric,
      label: metadata.metric,
      desc: metadata.help,
      type: metadata.type,
    }))
  }

  @computed
  get stat() {
    return this.monitor.stat
  }

  componentDidMount() {
    this.props.monitoringStore.fetchMetadata()
  }

  render() {
    const singleState = this.stat
    const title = get(this.monitor, 'config.title', '')

    return (
      <EditMonitorFormLayou
        preview={
          <ErrorContainer errorMessage={this.monitor.errorMessage}>
            <SingleStatGraph singleState={singleState} title={title} />
          </ErrorContainer>
        }
        sidebar={<GraphTextInput type="singlestat" />}
        main={
          <FormGroupCard label={t('Data')}>
            <SingleStatDataForm supportMetrics={this.supportMetrics} />
          </FormGroupCard>
        }
      />
    )
  }
}
