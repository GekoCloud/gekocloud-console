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

import { getIndexRoute } from 'utils/router.config'

import ResourceStatus from './ResourceStatus'
import AppTemplate from './AppTemplate'
import AppConfig from './AppConfig'

const PATH =
  '/:workspace/clusters/:cluster/projects/:namespace/applications/template/:id'

export default [
  {
    path: `${PATH}/resource-status`,
    name: 'resource-status',
    title: 'Resource Status',
    component: ResourceStatus,
    exact: true,
  },
  {
    path: `${PATH}/template`,
    title: 'App Template',
    component: AppTemplate,
    exact: true,
  },
  {
    path: `${PATH}/config`,
    title: 'App Config',
    component: AppConfig,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/resource-status`, exact: true }),
]
