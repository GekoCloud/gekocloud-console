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

import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class EmptyList extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    actions: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  }

  static defaultProps = {
    icon: 'appcenter',
  }

  render() {
    const { image, icon, title, desc, actions, className } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <div className={styles.image}>
          {image ? <img src={image} alt="" /> : <Icon name={icon} size={48} />}
        </div>
        <div className={styles.title}>{title}</div>
        <p className={styles.desc}>{desc}</p>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    )
  }
}
