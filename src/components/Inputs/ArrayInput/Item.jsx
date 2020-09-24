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

import { Button } from 'components/Base'

import styles from './index.scss'

const Item = ({ component, index, value, onChange, onDelete }) => {
  const childNode = React.cloneElement(component, {
    ...component.props,
    index,
    value,
    onChange,
  })

  return (
    <div className={styles.item}>
      {childNode}
      <Button
        type="flat"
        icon="trash"
        className={styles.delete}
        onClick={onDelete}
      />
    </div>
  )
}

export default Item
