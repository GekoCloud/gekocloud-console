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

import { withProps } from 'utils'
import { getChildRoutes } from 'utils/router.config'

import DetailLayout from 'core/layouts/Detail'
import Sider from '../../containers/Pipelines/Detail/Sider/runs-sider'

import {
  TaskStatus,
  Commit,
  Artifacts,
} from '../../containers/Pipelines/Detail'

const PATH = '/devops/:project_id/pipelines/:name/branch/:branch/run/:runid'
const PATH_NO_BRANCH = '/devops/:project_id/pipelines/:name/run/:runid'

const ROUTES = [
  { name: 'task-status', title: 'TaskStatus', component: TaskStatus },
  { name: 'commit', title: 'Commit', component: Commit },
  { name: 'artifacts', title: 'Artifacts', component: Artifacts },
]

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'cicds',
      component: Sider,
      breadcrumbs: [
        {
          label: 'Pipeline List',
          url: '/devops/:project_id/pipelines',
        },
        {
          label: 'Branch',
          url: '/devops/:project_id/pipelines/:name/branch',
        },
        {
          label: 'Activity',
          url: '/devops/:project_id/pipelines/:name/branch/:branch/activity',
        },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
  {
    path: PATH_NO_BRANCH,
    component: withProps(DetailLayout, {
      module: 'cicds',
      component: Sider,
      breadcrumbs: [
        {
          label: 'Pipeline List',
          url: '/devops/:project_id/pipelines',
        },
        {
          label: 'Activity',
          url: '/devops/:project_id/pipelines/:name/activity',
        },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH_NO_BRANCH),
  },
]
