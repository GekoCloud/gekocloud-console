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

import { isString } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.scss'

export default class RuleList extends React.Component {
  static propTypes = {
    rules: PropTypes.array,
  }

  static defaultProps = {
    rules: [],
  }

  render() {
    const { rules } = this.props

    return (
      <ul className={styles.rules}>
        {rules.map(rule => (
          <li key={rule.name}>
            <span className={styles.name}>
              {t(`RULE_${rule.name.toUpperCase()}`)}
            </span>
            <span>
              {rule.actions
                .map(action =>
                  t(
                    `RULE_${(isString(action)
                      ? action
                      : action.name || ''
                    ).toUpperCase()}`
                  )
                )
                .join(' / ')}
            </span>
          </li>
        ))}
      </ul>
    )
  }
}
