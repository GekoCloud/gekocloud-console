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
import Base from 'components/Forms/GrayRelease/Version'

export default class GrayReleaseComponent extends Base {
  get templatePrefix() {
    return 'workload'
  }

  get isEdit() {
    return true
  }

  versionValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const version = get(this.formTemplate, 'metadata.labels["version"]', '')

    if (value === version) {
      return callback()
    }

    const componentName = get(this.formTemplate, 'metadata.labels.app', '')

    const name = `${componentName}-${value}`
    const kind = this.workloadKind
    this.workloadStore
      .checkName({
        name,
        namespace: this.namespace,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({
            message: t(
              `${t(kind)} ${name} ${t('exists')}, ${t(
                'version number is invalid'
              )}`
            ),
            field: rule.field,
          })
        }
        callback()
      })
  }
}
