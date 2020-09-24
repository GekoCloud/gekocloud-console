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

import BaseInfo from 'components/Forms/Workload/BaseInfo'
import RouteRules from 'components/Forms/Route/RouteRules'
import AdvanceSettings from 'components/Forms/Route/AdvanceSettings'

export default [
  { title: 'Basic Info', icon: 'cdn', component: BaseInfo, required: true },
  { title: 'Route Rules', icon: 'cdn', component: RouteRules, required: true },
  {
    title: 'Advanced Settings',
    icon: 'slider',
    component: AdvanceSettings,
    required: true,
  },
]
