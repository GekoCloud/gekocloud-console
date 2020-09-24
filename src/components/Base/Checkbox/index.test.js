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
import { mount } from 'enzyme'

import Checkbox from './index'

it('renders correctly', () => {
  const props = {
    name: 'showToggle',
    value: true,
    onChange: jest.fn(),
  }

  const wrapper = mount(<Checkbox {...props}>Checkbox</Checkbox>)
  expect(wrapper).toIncludeText('Checkbox')
  expect(wrapper.find('input[type="checkbox"]')).toHaveProp('checked', true)

  wrapper
    .find('input[type="checkbox"]')
    .simulate('change', { target: { checked: false } })
  expect(props.onChange).toHaveBeenCalledTimes(1)

  wrapper.setProps({ value: true })
  expect(wrapper.find('input[type="checkbox"]')).toHaveProp('checked', true)
})
