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

import { get, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Button, Notify } from 'components/Base'
import { Dropdown, Icon, DatePicker, Select, Tooltip } from '@pitrix/lego-ui'
import moment from 'moment-mini'

import styles from './index.scss'

class TimeRangeSelector extends Component {
  static propTypes = {
    recent: PropTypes.object,
    timeRange: PropTypes.object,
    format: PropTypes.func,
    recentOpts: PropTypes.array,
    interval: PropTypes.string,
    intervalOpts: PropTypes.array,
    onRecentSelect: PropTypes.func,
    onCustomSubmit: PropTypes.func,
  }

  static defaultProps = {
    recent: null,
    timeRange: { startTime: Date.now(), endTime: Date.now() },
    format: ({ count, unit } = {}, { startTime = 0, endTime = 0 }) =>
      count
        ? `${t('Last')} ${count} ${t(unit)}`
        : `${moment(startTime).format('YYYY/MM/DD HH:mm:ss')} ~ ${moment(
            endTime
          ).format('YYYY/MM/DD HH:mm:ss')}`,
    recentOpts: [
      { label: 'Last 5 Minutes', value: { count: 5, unit: 'Minutes' } },
    ],
    intervalOpts: [
      // { label: '5 Seconds', value: '5s' }
    ],
    onRecentSelect() {},
    onCustomSummit() {},
  }

  startTimeRef = React.createRef()

  endTimeRef = React.createRef()

  componentDidMount() {
    const startCalendar = get(
      this.startTimeRef,
      'current.instance.calendarContainer',
      {}
    )
    const endCalendar = get(
      this.endTimeRef,
      'current.instance.calendarContainer',
      {}
    )

    startCalendar.addEventListener('click', this.stopPropagation)
    endCalendar.addEventListener('click', this.stopPropagation)
    document.addEventListener('click', this.handleOutsideClick)
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  handleRecentClick = e => {
    const { dataset } = e.currentTarget
    const { index } = dataset
    const { recentOpts, onRecentSelect } = this.props

    onRecentSelect(get(recentOpts, `[${index}].value`))
  }

  handleSubmit = timeRange => {
    const { startTime, endTime, interval } = timeRange
    const [start] = startTime
    const [end] = endTime

    if (start > end) {
      Notify.error({ content: t('TIMERANGE_SELECTOR_MSG') })
    } else {
      this.props.onCustomSubmit({ startTime: start, endTime: end, interval })
    }
  }

  render() {
    const { format, timeRange, recent } = this.props
    const content = format(recent || {}, timeRange)

    return (
      <div className={styles.wrapper}>
        <Dropdown content={this.renderDropDown()} closeAfterClick={false}>
          <div className={styles.content}>
            <Icon name="calendar" />
            <Tooltip content={recent ? null : content}>
              <h4>{content}</h4>
            </Tooltip>
            <Icon name="caret-down" />
          </div>
        </Dropdown>
      </div>
    )
  }

  renderDropDown() {
    return (
      <div className={styles.dropdown}>
        {this.renderRecentOpts()}
        {this.renderCustomOpts()}
      </div>
    )
  }

  renderRecentOpts() {
    const { recentOpts } = this.props
    return (
      <>
        <h3>{t('Select Time Range')}</h3>
        <div className={styles.recentWrapper}>
          {recentOpts.map(({ label }, index) => (
            <span
              onClick={this.handleRecentClick}
              data-index={index}
              key={index}
            >
              {label}
            </span>
          ))}
        </div>
      </>
    )
  }

  renderCustomOpts() {
    const { timeRange, interval, intervalOpts } = this.props
    const { startTime, endTime } = timeRange

    const datePickerProps = {
      enableSeconds: true,
      enableTime: true,
      dateFormat: 'Y-m-d H:i:S',
      showClearBtn: false,
    }
    return (
      <>
        <h3>{t('Custom Time Range')}</h3>
        <Form
          data={{ interval, startTime: [startTime], endTime: [endTime] }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label={t('Start Time')}>
            <DatePicker
              ref={this.startTimeRef}
              name={'startTime'}
              {...datePickerProps}
            />
          </Form.Item>
          <Form.Item label={t('End Time')}>
            <DatePicker
              ref={this.endTimeRef}
              name={'endTime'}
              {...datePickerProps}
            />
          </Form.Item>
          <div className={styles.footer}>
            {isEmpty(intervalOpts) || (
              <Form.Item label={t('Time Interval')}>
                <Select
                  name="interval"
                  className={styles.select}
                  options={intervalOpts}
                />
              </Form.Item>
            )}
            <div>
              <Button htmlType={'submit'}>{t('OK')}</Button>
            </div>
          </div>
        </Form>
      </>
    )
  }
}
export default TimeRangeSelector
