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

import GrayReleaseBaseInfo from 'components/Forms/GrayRelease/BaseInfo'
import GrayReleaseComponents from 'components/Forms/GrayRelease/Components'
import GrayReleaseVersion from 'components/Forms/GrayRelease/Version'
import PolicyConfig from 'components/Forms/GrayRelease/PolicyConfig'

export default [
  { title: 'Basic Info', component: GrayReleaseBaseInfo, required: true },
  {
    title: 'Grayscale Release Components',
    component: GrayReleaseComponents,
    required: true,
  },
  {
    title: 'Grayscale Release Version',
    component: GrayReleaseVersion,
    required: true,
  },
  {
    title: 'Policy Config',
    component: PolicyConfig,
    required: true,
  },
]
