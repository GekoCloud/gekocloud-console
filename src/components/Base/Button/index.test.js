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
import { mount } from 'enzyme'
import styles from 'identity-obj-proxy'

import Button from './index'

it('renders correctly', () => {
  const props = {
    type: 'control',
    htmlType: 'submit',
    className: 'primary',
    icon: 'refresh',
  }

  const wrapper = mount(<Button {...props}>Test</Button>)
  expect(wrapper.find('button')).toHaveText('Test')
  expect(wrapper.find('button')).toHaveClassName(styles.control)
  expect(wrapper.find('button')).toHaveClassName(styles.hasIcon)
  expect(wrapper.find('button')).toHaveProp('type', props.htmlType)
  expect(wrapper.find('button')).toHaveProp('type', props.htmlType)
  expect(wrapper.find('.qicon-refresh')).toHaveLength(1)
})

it('call onClick', () => {
  const onClick = jest.fn()
  const wrapper = mount(<Button onClick={onClick} />)
  wrapper.find('button').simulate('click')

  expect(onClick).toHaveBeenCalled()
})

it('not call onClick if disabled', () => {
  const onClick = jest.fn()
  const wrapper = mount(<Button onClick={onClick} disabled />)
  wrapper.find('button').simulate('click')

  expect(onClick).not.toHaveBeenCalled()
})
