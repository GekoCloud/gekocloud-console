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

import React from 'react'
import classnames from 'classnames'

import { UrlInput } from 'components/Inputs'

import fromStyles from 'src/components/Base/Form/index.scss'
import styles from './index.scss'

export default class BaseInfo extends React.Component {
  render() {
    return (
      <div className={styles.fromGroup}>
        <div className={classnames(styles.path, fromStyles.item)}>
          <label className={fromStyles.label}>{t('Service Address')}:</label>
          <div className={styles.columns}>
            <UrlInput defaultPort={24224} />
          </div>
          <div className={classnames(fromStyles.desc, styles.desc)}>
            {t('LOG_COLLECTION_FLUENTD_URL_TIPS')}
          </div>
        </div>
      </div>
    )
  }
}
