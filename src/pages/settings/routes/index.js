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

import { get } from 'lodash'
import { getIndexRoute } from 'utils/router.config'

import Layout from '../containers/layout'
import BaseInfo from '../containers/BaseInfo'
import ThirdPartyLogin from '../containers/ThirdPartyLogin'

const PATH = '/settings'

const navs = globals.app.getPlatformSettingsNavs()
const indexRoute = get(navs, '[0].items[0].name', 'nodes')

export default [
  {
    path: PATH,
    component: Layout,
    routes: [
      {
        path: `${PATH}/base-info`,
        component: BaseInfo,
      },
      {
        path: `${PATH}/third-login`,
        component: ThirdPartyLogin,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/${indexRoute}`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]