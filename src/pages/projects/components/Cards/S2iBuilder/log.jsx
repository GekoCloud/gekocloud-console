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
import { observer } from 'mobx-react'
import { isFunction } from 'lodash'
import classnames from 'classnames'
import { Icon, Loading, Tooltip } from '@pitrix/lego-ui'
import { Empty } from 'components/Base'
import RunStore from 'stores/s2i/run'

import styles from './index.scss'

@observer
export default class Log extends React.Component {
  static defaultProps = {
    logURL: '',
    runState: '',
  }

  constructor() {
    super()
    this.state = {
      showLog: true,
      isContainerPending: false,
    }
    this.store = new RunStore()
    this.refreshTimer = null
    this.LogContent = React.createRef()
  }

  componentDidMount() {
    this.getLog()
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimer)
  }

  toggleLog = () => {
    if (this.state.showLog) {
      this.setState({ showLog: false })
      return
    }
    this.setState({ showLog: true })
  }

  getLog = async () => {
    const { logURL, status } = this.props.runDetail
    const { logData } = this.store
    const isRunning = status === 'Building' || status === 'Unknown'
    clearTimeout(this.refreshTimer)

    if (!logURL) {
      this.refreshTimer = setTimeout(this.getLog, 4000)
      return
    }
    if (globals.app.hasKSModule('logging')) {
      await this.store.getLog(logURL)
    } else {
      await this.store.fetchPodsLogs(logURL).catch(error => {
        if (error === 'container not ready') {
          this.setState({ isContainerPending: true })
        }
      })
    }
    this.handleScrollToBottom()
    if (logData.hasMore) {
      this.getLog()
      return
    }
    if (isRunning) {
      this.refreshTimer = setTimeout(this.getLog, 4000)
    }
  }

  handleScrollToBottom = () => {
    const LogContent = this.LogContent.current
    if (LogContent) {
      LogContent.scrollTop = LogContent.scrollHeight
    }
  }

  handleRerun = () => {
    const { onRerun } = this.props
    onRerun()
  }

  renderTitle = () => {
    const { status } = this.props.runDetail
    const { builderName, onRerun } = this.props
    if (status === 'Successful') {
      return (
        <React.Fragment>
          <span className={classnames(styles.icon, styles.successful)} />
          <p>
            <span className={styles.taskName}>{builderName}</span>
            {t('building logs')}
          </p>
        </React.Fragment>
      )
    }

    if (status === 'Building') {
      return (
        <React.Fragment>
          <span className={classnames(styles.icon, styles.running)} />
          <p>
            {t('Task')}
            <span className={styles.taskName}>{builderName}</span>
            {t('is Building')}
          </p>
        </React.Fragment>
      )
    }

    if (status === 'Failed') {
      return (
        <React.Fragment>
          <span className={classnames(styles.icon, styles.failed)} />
          <p>
            {t('Task')}
            <span className={styles.taskName}>{builderName}</span>
            {t('is Failed')}
            {isFunction(onRerun) ? (
              <Tooltip content={t('Rebuild Image')}>
                <Icon name="refresh" onClick={this.handleRerun} />
              </Tooltip>
            ) : null}
          </p>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <span className={classnames(styles.icon, styles.unknow)} />
        <p>
          <span className={styles.taskName}>{builderName}</span>
          {t('building logs')}
        </p>
      </React.Fragment>
    )
  }

  renderLog() {
    const { log } = this.store.logData
    const { runState } = this.props

    if (!log) {
      if (runState === 'Running' || runState === 'Unknown') {
        return (
          <Loading>
            <p className={styles.noneLogDesc} />
          </Loading>
        )
      }
      return <p className={styles.noneLogDesc}>{t('No log records')}</p>
    }
    return <pre ref={this.LogContent}>{log}</pre>
  }

  render() {
    if (this.state.isContainerPending) {
      return (
        <div className={styles.logContainer}>
          <Empty desc={'CONTAINER_REAL_TIME_LOGS_UNSUPPORTED_TIPS'} />
        </div>
      )
    }

    return (
      <div className={styles.logContainer}>
        <div className={styles.title} onClick={this.toggleLog}>
          {this.renderTitle()}
          <Icon
            name={this.state.showLog ? 'chevron-up' : 'chevron-down'}
            size={20}
          />
        </div>
        {this.state.showLog ? this.renderLog() : null}
      </div>
    )
  }
}
