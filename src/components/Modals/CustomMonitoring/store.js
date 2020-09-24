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

import { observable, action } from 'mobx'

export default class CustomMonitoringModalStore {
  @observable
  theme = 'dark'

  @observable
  selectedMonitor = null

  @observable
  shouldNewMonitorModalShow = false

  @action
  selectMonitor(monitor) {
    this.selectedMonitor = monitor
  }

  @action
  unSelectMonitor() {
    this.selectedMonitor = null
  }

  @action
  changeTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }

  @action
  showNewMonitorModal() {
    this.shouldNewMonitorModalShow = true
  }

  @action
  hideNewMonitorModal() {
    this.shouldNewMonitorModalShow = false
  }
}