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

import React, { Component } from 'react'
import classNames from 'classnames'
import { debounce } from 'lodash'
import { Checkbox, Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class Placement extends Component {
  state = {
    replicas: this.props.replicas || 0,
  }

  triggerChange = debounce(() => {
    const { cluster, onChange } = this.props
    const { replicas } = this.state

    onChange && onChange(cluster, replicas)
  }, 200)

  handleSubStract = () => {
    this.setState(
      ({ replicas }) => ({ replicas: Math.max(replicas - 1, 1) }),
      () => {
        this.triggerChange()
      }
    )
  }

  handleAdd = () => {
    this.setState(
      ({ replicas }) => ({ replicas: replicas + 1 }),
      () => {
        this.triggerChange()
      }
    )
  }

  handleWrapperClick = () => {
    this.setState(
      ({ replicas }) => ({ replicas: replicas > 0 ? 0 : 1 }),
      () => {
        this.triggerChange()
      }
    )
  }

  stopPropagation = e => e.stopPropagation()

  render() {
    const { cluster } = this.props
    const { replicas } = this.state
    const isChecked = !!replicas
    return (
      <div
        className={classNames(styles.wrapper, { [styles.checked]: isChecked })}
        onClick={this.handleWrapperClick}
      >
        <Checkbox checked={isChecked} onClick={this.handleWrapperClick}>
          {cluster}
        </Checkbox>
        <div className={styles.replicas} onClick={this.stopPropagation}>
          <Icon
            name="substract"
            type="light"
            size={20}
            clickable
            disabled={!isChecked}
            onClick={this.handleSubStract}
          />
          <span className={styles.value}>
            {replicas}
            <span> {t('Replicas')}</span>
          </span>
          <Icon
            name="add"
            type="light"
            size={20}
            clickable
            disabled={!isChecked}
            onClick={this.handleAdd}
          />
        </div>
      </div>
    )
  }
}
