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

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import { Columns, Column } from '@pitrix/lego-ui'

import Health from 'projects/components/Health'
import { ReactComponent as ForkIcon } from 'src/assets/fork.svg'

import styles from './nav.scss'

@observer
class Nav extends Component {
  static defaultProps = {
    module: '',
  }

  get enabledActions() {
    const { project_id } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      project: project_id,
    })
  }

  get isMutiBranch() {
    const { detailStore } = this.props

    return Boolean(detailStore.detail.scmSource)
  }

  renderBaseInfo() {
    const { detail } = this.props.detailStore

    return (
      <Columns className={styles.baseInfo}>
        <Column className={styles.baseInfo__item}>
          <div className={styles.dashboardValue}>
            <Health score={detail.weatherScore} />
          </div>
          <div className={styles.dashboardLable}>{t('Health Status')}</div>
        </Column>
        <Column className={styles.baseInfo__item}>
          <div className={styles.dashboardValue}>
            <ForkIcon style={{ width: '20px', height: '20px' }} />{' '}
            {detail.totalNumberOfBranches || '-'}
          </div>
          <div className={styles.dashboardLable}>{t('Branch Count')}</div>
        </Column>
        <Column className={styles.baseInfo__item} />
      </Columns>
    )
  }

  renderNavLink(item) {
    const { name, title } = item
    const { detailStore, sonarqubeStore } = this.props

    const showPipelineConfig = this.enabledActions.includes('edit')

    if (!name) return null
    if (detailStore && sonarqubeStore) {
      if ((!showPipelineConfig || this.isMutiBranch) && name === 'pipeline') {
        return null
      }
      if (!sonarqubeStore.detail.totalStatus && name === 'code-quality') {
        return null
      }
      if (!this.isMutiBranch && name === 'branch') {
        return null
      }
      if (
        !detailStore.detail.totalNumberOfPullRequests &&
        name === 'pull-request'
      ) {
        return null
      }
    }

    return (
      <NavLink
        key={name}
        className={styles.navItem}
        activeClassName={styles.active}
        to={`${this.props.match.url}/${name}`}
      >
        {t(title)}
      </NavLink>
    )
  }

  render() {
    const { route } = this.props
    return (
      <React.Fragment>
        {this.renderBaseInfo()}
        <div className={styles.nav}>
          {route.routes.map(item => this.renderNavLink(item))}
        </div>
      </React.Fragment>
    )
  }
}

export default inject('rootStore')(observer(Nav))
