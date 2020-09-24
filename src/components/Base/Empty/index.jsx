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
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './index.scss'

export default class Empty extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    img: PropTypes.string,
    desc: PropTypes.string,
  }

  static defaultProps = {
    img: '/assets/empty-card.svg',
    desc: 'No Relevant Data',
  }

  render() {
    const { className, img, desc } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <img src={img} alt="No data" />
        <div className={styles.content}>{t(desc)}</div>
      </div>
    )
  }
}
