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
import { getIndexRoute } from 'utils/router.config'

import DetailLayout from 'core/layouts/Detail'

import Detail from '../containers/Roles/Detail'
import AuthorizationList from '../containers/Roles/Detail/AuthorizationList'
import AuthorizedUsers from '../containers/Roles/Detail/AuthorizedUsers'

const PATH = '/workspaces/:workspace/roles/:role'

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'roles',
      component: Detail,
      breadcrumbs: [
        { label: 'Workspace', url: '/workspaces/:workspace' },
        { label: 'Roles', url: '/workspaces/:workspace/roles' },
      ],
    }),
    routes: [
      {
        name: 'authorizations',
        path: `${PATH}/authorizations`,
        title: 'Authorization List',
        component: AuthorizationList,
      },
      {
        name: 'users',
        path: `${PATH}/users`,
        title: 'Authorized Users',
        component: AuthorizedUsers,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/authorizations`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
