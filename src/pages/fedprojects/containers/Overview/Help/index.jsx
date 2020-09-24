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
import classNames from 'classnames'
import { Icon } from '@pitrix/lego-ui'

import { getDocsUrl } from 'utils'

import styles from './index.scss'

export default class Help extends React.Component {
  render() {
    const { className } = this.props
    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={styles.header}>
          <Icon name="question" size={24} />
          {t('Help Information')}
        </div>
        <div className={styles.tip}>
          <a href={getDocsUrl('project_members')} target="_blank">
            💁 {t('How to invite other members to the current project?')}
          </a>
        </div>
        <div className={styles.tip}>
          <a href={getDocsUrl('internet')} target="_blank">
            💁 {t('How to set the project gateway?')}
          </a>
        </div>
      </div>
    )
  }
}