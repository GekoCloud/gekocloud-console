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

import { getIndexRoute } from 'utils/router.config'

import AlertingDetail from './AlertDetail'
import AlertingPolicy from './AlertPolicy'
import NotificationHistory from './NotificationHistory'
import Comment from './Comment'

const PATH = '/clusters/:cluster/alert-messages/:id'

export default [
  {
    path: `${PATH}/alert-detail`,
    title: 'Alerting Detail',
    component: AlertingDetail,
    exact: true,
  },
  {
    path: `${PATH}/alert-policy`,
    title: 'Alerting Policy',
    component: AlertingPolicy,
    exact: true,
  },
  {
    path: `${PATH}/notification-history`,
    title: 'Recent Notification',
    component: NotificationHistory,
    exact: true,
  },
  {
    path: `${PATH}/comment`,
    title: 'ALERT_COMMENT',
    component: Comment,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/alert-detail`, exact: true }),
]