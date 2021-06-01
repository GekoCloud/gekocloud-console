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
import { mount } from 'enzyme'
import styles from 'identity-obj-proxy'

import TypeSelect from './index'

it('renders correctly', () => {
  const options = [
    {
      icon: 'backup',
      value: 'stateful',
      label: 'Stateful Service',
      description: 'STATEFUL_SERVICE_DESC',
    },
    {
      icon: 'backup',
      value: 'stateless',
      label: 'Stateless Service',
      description: 'STATELESS_SERVICE_DESC',
    },
  ]

  const props = {
    value: 'stateful',
    onChange: jest.fn(),
    options,
  }

  const wrapper = mount(<TypeSelect {...props} />)
  expect(wrapper.find(`.${styles.control} .${styles.text} > div`)).toHaveText(
    'Stateful Service'
  )
  expect(wrapper.find(`.${styles.control} .${styles.text} > p`)).toHaveText(
    'STATEFUL_SERVICE_DESC'
  )
  expect(wrapper.find(`.${styles.options}`)).not.toExist()

  wrapper.setProps({ value: 'stateless' })
  expect(wrapper.find(`.${styles.control} .${styles.text} > div`)).toHaveText(
    'Stateless Service'
  )
  expect(wrapper.find(`.${styles.control} .${styles.text} > p`)).toHaveText(
    'STATELESS_SERVICE_DESC'
  )

  wrapper.find(`.${styles.control}`).simulate('click')
  expect(wrapper.find(`.${styles.options}`)).toExist()

  jest.useFakeTimers()

  wrapper
    .find(`.${styles.option}`)
    .at(0)
    .simulate('click')
  jest.advanceTimersByTime(200)
  expect(props.onChange).toHaveBeenCalled()
})
