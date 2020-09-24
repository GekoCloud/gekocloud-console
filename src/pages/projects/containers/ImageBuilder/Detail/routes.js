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

import ImageBuildRecords from './BuildRecords'
import ResourceStatus from './ResourceStatus'
import Env from './Environment'
import Events from './Events'
import ImageArtifacts from './ImageProduct'

export default path => [
  {
    path: `${path}/records`,
    title: 'Execution Records',
    component: ImageBuildRecords,
    excat: true,
  },
  {
    path: `${path}/resource-status`,
    title: 'Resource Status',
    component: ResourceStatus,
    excat: true,
  },
  {
    path: `${path}/image-artifacts`,
    title: 'Image Artifacts',
    component: ImageArtifacts,
    excat: true,
  },
  {
    path: `${path}/env`,
    title: 'Environment Variables',
    component: Env,
    excat: true,
  },
  { path: `${path}/events`, title: 'Events', component: Events, excat: true },
  getIndexRoute({ path, to: `${path}/records`, exact: true }),
]
