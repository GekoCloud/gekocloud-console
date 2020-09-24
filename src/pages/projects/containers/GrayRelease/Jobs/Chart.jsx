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
import PropTypes from 'prop-types'
import { Icon, Tooltip } from '@pitrix/lego-ui'
import { PieChart } from 'components/Charts'

import styles from './index.scss'

export default class Chart extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    tip: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    legendData: PropTypes.array,
  }

  static defaultProps = {
    name: '',
    data: [],
    legendData: [],
  }

  getSeriesData = () => {
    const { data, legendData } = this.props

    return [
      {
        name: legendData[0],
        itemStyle: {
          fill: '#F18918',
        },
        value: data[0] || 0,
      },
      {
        name: legendData[1],
        itemStyle: {
          fill: '#c7deef',
        },
        value: data[1] || 0,
      },
    ]
  }

  renderTip() {
    const { tip } = this.props

    return (
      <Tooltip content={tip}>
        <Icon name="information" className={styles.tip} />
      </Tooltip>
    )
  }

  render() {
    const { name, icon, data, unit, tip } = this.props
    return (
      <div className={styles.chart}>
        <div className={styles.circle}>
          <Icon name={icon} size={20} />
          <PieChart width={60} height={60} data={this.getSeriesData()} />
        </div>
        <div className={styles.chartDetail}>
          <div>
            {name} {tip && this.renderTip()}
          </div>
          <p className={styles.tag}>
            {isNaN(data[0]) ? t('No Data') : `${data[0]} ${unit}`}
          </p>
          <p className={styles.tag}>
            {isNaN(data[1]) ? t('No Data') : `${data[1]} ${unit}`}
          </p>
        </div>
      </div>
    )
  }
}
