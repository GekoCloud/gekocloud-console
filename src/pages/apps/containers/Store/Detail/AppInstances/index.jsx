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
import { get } from 'lodash'

import InstanceList from 'apps/components/Lists/InstanceList'

export default class AppInstances extends React.Component {
  render() {
    return (
      <InstanceList
        appStore={this.props.detailStore}
        versionStore={this.props.versionStore}
        appId={get(this.props.detailStore, 'detail.app_id', '')}
        title={t('App Instances')}
        empty={t('No app instances data')}
        hideFooter
      />
    )
  }
}
