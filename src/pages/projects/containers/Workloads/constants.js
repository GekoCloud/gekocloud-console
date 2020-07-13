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

import DEPLOYMENTS_FORM_STEPS from 'configs/steps/deployments'
import STATEFULSETS_FORM_STEPS from 'configs/steps/statefulsets'
import DAEMONSETS_FORM_STEPS from 'configs/steps/daemonsets'

export const FORM_STEPS = {
  deployments: DEPLOYMENTS_FORM_STEPS,
  statefulsets: STATEFULSETS_FORM_STEPS,
  daemonsets: DAEMONSETS_FORM_STEPS,
}