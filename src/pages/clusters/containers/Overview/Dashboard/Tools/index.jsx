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

import React, { Component } from 'react'
import { Panel, Text } from 'components/Base'

import { createCenterWindowOpt } from 'utils/dom'

import styles from './index.scss'

export default class Tools extends Component {
  getWindowOpts() {
    return createCenterWindowOpt({
      width: 1200,
      height: 800,
      scrollbars: 1,
      resizable: 1,
    })
  }

  handleTool = e => {
    window.open(
      e.currentTarget.dataset.url,
      e.currentTarget.dataset.title,
      this.getWindowOpts()
    )
  }

  render() {
    const { cluster } = this.props
    return (
      <Panel title={t('Tools')}>
        <div className={styles.level}>
          <div
            className="margin-r12"
            data-title="KubeCtl"
            data-url={`/terminal/kubectl/${cluster}`}
            onClick={this.handleTool}
          >
            <Text
              icon="terminal"
              title="Kubectl"
              description={t('KUBECTL_DESC')}
            />
          </div>
          <div
            data-title="KubeConfig"
            data-url={`/clusters/${cluster}/kubeConfig`}
            onClick={this.handleTool}
          >
            <Text
              icon="data"
              title="KubeConfig"
              description={t('KUBECONFIG_DESC')}
            />
          </div>
        </div>
      </Panel>
    )
  }
}
