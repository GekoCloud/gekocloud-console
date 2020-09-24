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

import React from 'react'

import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default function GraphType({ type }) {
  const map = {
    singlestat: {
      i18n: t('SINGLE_STATE_CHART'),
      icon: 'text',
    },
    line: {
      i18n: t('LINE_CHART'),
      icon: 'linechart',
    },
    bar: {
      i18n: t('BAR_CHART'),
      icon: 'barchart',
    },
    table: {
      i18n: t('TABLE'),
      icon: 'table-chart',
    },
  }
  const icon = map[type].icon
  const title = map[type].i18n
  return (
    <div className={styles.wrapper}>
      <header>{t('CHART_TYPES')}</header>
      <div>
        <Icon name={icon} type="light" size={40} />
        <h3>{title}</h3>
      </div>
    </div>
  )
}
