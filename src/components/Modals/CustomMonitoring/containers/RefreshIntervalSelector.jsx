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
import React from 'react'
import { observer, inject } from 'mobx-react'
import { translateTimeAlias } from 'utils/time'
import { Icon } from '@juanchi_xd/components'

import Select from '../components/DarkThemeSelect'

import { refreshInterval as refreshOpts } from '../options'

@inject('monitoringStore')
@observer
class RefreshIntervalSelector extends React.Component {
  handleChange = value => {
    this.props.monitoringStore.changeRefreshInterval(value)
  }

  options = refreshOpts.map(interval => ({
    label: interval
      ? `${t('Interval')} ${translateTimeAlias(interval)}`
      : t('No Refreshing'),
    value: interval,
  }))

  render() {
    const { monitoringStore } = this.props
    const { refresh } = monitoringStore
    return (
      <Select
        prefixIcon={<Icon name={'refresh'} type={'light'} />}
        onChange={this.handleChange}
        options={this.options}
        value={refresh}
      />
    )
  }
}

export default RefreshIntervalSelector
