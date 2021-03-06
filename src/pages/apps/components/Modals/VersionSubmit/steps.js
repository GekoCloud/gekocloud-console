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

import TestSteps from 'apps/components/Cards/TestSteps'
import VersionEdit from 'apps/components/Forms/VersionEdit'

export default [
  {
    title: 'Test Steps',
    icon: 'cdn',
    component: TestSteps,
    value: 'testSteps',
    required: true,
  },
  {
    title: 'Update Log',
    icon: 'update',
    component: VersionEdit,
    value: 'updateLog',
    required: true,
  },
]
