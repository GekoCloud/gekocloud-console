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

import Workspaces from '../containers/Workspaces'
import Projects from '../containers/Projects'
import Dashboard from '../containers/Dashboard'
import NotFound from '../containers/NotFound'
import Accounts from '../containers/Accounts'
import Roles from '../containers/Roles'
import ServiceComponents from '../containers/ServiceComponents'

import accountRoutes from './account'
import roleRoutes from './role'
import logCollectionRoutes from './logCollection'
import componentRoutes from './component'
import volumeRoutes from './volume'
import platformRoutes from './platformSettings'
import infrastructureRoutes from './infrastructure'
import monitoringRoutes from './monitoring'

export default [
  { path: '/404', component: NotFound, exact: true },
  { path: '/dashboard', component: Dashboard, exact: true },
  { path: '/workspaces', component: Workspaces, exact: true },
  { path: '/projects', component: Projects, exact: true },
  { path: '/accounts', component: Accounts, exact: true },
  { path: '/roles', component: Roles, exact: true },
  { path: '/components', component: ServiceComponents, exact: true },
  ...platformRoutes,
  ...logCollectionRoutes,
  ...infrastructureRoutes,
  ...monitoringRoutes,
  ...accountRoutes,
  ...roleRoutes,
  ...componentRoutes,
  ...volumeRoutes,
  {
    path: '/',
    redirect: { from: '/', to: '/dashboard', exact: true },
  },
  {
    path: '*',
    redirect: { from: '*', to: '/404', exact: true },
  },
]
