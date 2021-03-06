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

import { Input } from '@pitrix/lego-ui'
import ObjectInput from './index'

it('renders correctly', () => {
  const defaultData = {
    a: 'a',
  }
  const onchangeCb = jest.fn()
  const wrapper = mount(
    <ObjectInput onChange={onchangeCb} value={defaultData}>
      <Input name="key" placeholder={t('key')} />
      <Input name="value" rows="1" placeholder={t('value')} />
    </ObjectInput>
  )

  const items = wrapper.find('Input')
  expect(items).toHaveLength(2)
})

it('change correctly', () => {
  const defaultData = {
    a: 'a',
  }
  const onchangeCb = jest.fn()
  const wrapper = mount(
    <ObjectInput onChange={onchangeCb} value={defaultData}>
      <Input name="key" placeholder={t('key')} />
      <Input name="value" rows="1" placeholder={t('value')} />
    </ObjectInput>
  )

  const keyInput = wrapper.find('Input').first()
  expect(keyInput).toExist()
  keyInput.prop('onChange')({ currentTarget: { value: 'key' } })
  expect(onchangeCb).toHaveBeenCalledWith({ a: 'a', key: 'key', value: '' })
})
