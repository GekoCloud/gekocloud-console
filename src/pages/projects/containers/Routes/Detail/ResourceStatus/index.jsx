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

import { omit, isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Card } from 'components/Base'
import Annotations from 'projects/components/Cards/Annotations'

import Rule from './Rule'

import styles from './index.scss'

@observer
class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.module
  }

  componentDidMount() {
    const detail = toJS(this.store.detail)
    this.store.getGateway({ namespace: detail.namespace })
  }

  renderRules() {
    const detail = toJS(this.store.detail)
    const gateway = toJS(this.store.gateway.data)
    const tls = detail.tls[0] || {}

    if (isEmpty(detail.rules)) {
      return null
    }

    const { namespace } = this.props.match.params

    return (
      <Card title={t('Rules')}>
        {detail.rules.map(rule => (
          <Rule
            key={rule.host}
            tls={tls}
            rule={rule}
            gateway={gateway}
            prefix={`/projects/${namespace}`}
          />
        ))}
      </Card>
    )
  }

  renderAnnotations() {
    const detail = toJS(this.store.detail)

    return (
      <Annotations
        data={omit(detail.annotations, ['displayName', 'desc', 'creator'])}
      />
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderRules()}
        {this.renderAnnotations()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default ResourceStatus
