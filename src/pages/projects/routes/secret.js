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

import Detail from '../containers/Secrets/Detail'
import SecretDetail from '../containers/Secrets/Detail/SecretDetail'

const PATH = '/projects/:namespace/secrets/:name'
const ROUTES = [{ name: 'detail', title: 'Detail', component: SecretDetail }]

export default [
  {
    path: PATH,
    component: withProps(DetailLayout, {
      module: 'secrets',
      component: Detail,
      breadcrumbs: [
        {
          label: 'Project',
          url: '/projects/:namespace',
        },
        {
          label: 'Secrets',
          url: '/projects/:namespace/secrets',
        },
      ],
    }),
    routes: getChildRoutes(ROUTES, PATH),
  },
]
