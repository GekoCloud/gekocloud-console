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
import { getIndexRoute } from 'utils/router.config'

import Layout from '../../containers/Infrastructure/layout'

import Nodes from '../../containers/Infrastructure/Nodes'
import StorageClasses from '../../containers/Infrastructure/StorageClasses'

import nodeRoutes from './node'
import storageClassRoutes from './storageClass'

const PATH = '/infrastructure'

const navs = globals.app.getInfraNavs()
const indexRoute = get(navs, '[0].items[0].name', 'nodes')

export default [
  ...nodeRoutes,
  ...storageClassRoutes,
  {
    path: PATH,
    component: Layout,
    routes: [
      {
        path: `${PATH}/nodes`,
        component: Nodes,
        exact: true,
      },
      {
        path: `${PATH}/storageclasses`,
        component: StorageClasses,
        exact: true,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/${indexRoute}`, exact: true }),
    ],
  },
]
