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
import { get, set, debounce } from 'lodash'
import { Columns, Column, Addons } from '@pitrix/lego-ui'

import { TypeSelect, Button, Form } from 'components/Base'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

export default class ReplicasContorl extends React.Component {
  static propTypes = {
    template: PropTypes.object,
  }

  state = {
    replicas: this.props.replicas || 1,
  }

  get replicasPolicyOptions() {
    const matchLabels = get(
      this.props.template,
      'spec.template.metadata.labels',
      {}
    )

    const affinity = {
      preferredDuringSchedulingIgnoredDuringExecution: [
        {
          weight: 100,
          podAffinityTerm: {
            labelSelector: {
              matchLabels,
            },
            topologyKey: 'kubernetes.io/hostname',
          },
        },
      ],
    }

    return [
      {
        uid: 'default',
        label: t("Pod's default deployment"),
        value: {},
        description: t('Pod will be deployed by default policy'),
      },
      {
        uid: 'decentralized',
        label: t("Pod's decentralized deployment"),
        value: {
          podAntiAffinity: affinity,
        },
        description: t('Pod will be deployed at scattered nodes'),
      },
      {
        uid: 'aggregation',
        label: t("Pod's aggregation deployment"),
        value: {
          podAffinity: affinity,
        },
        description: t('Pod will be deployed at the same node'),
      },
    ]
  }

  triggerChange = debounce(() => {
    const { template, onChange } = this.props
    const { replicas } = this.state

    set(template, 'spec.replicas', replicas)

    onChange && onChange(replicas)
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

  handleChange = replicas => {
    this.setState({ replicas }, () => {
      this.triggerChange()
    })
  }

  renderReplicas() {
    const { replicas } = this.state
    return (
      <div className={styles.replicas}>
        <div className="margin-b8">{t('Pod Replicas')}</div>
        <Addons>
          <Button type="flat" icon="substract" onClick={this.handleSubStract} />
          <NumberInput value={replicas} onChange={this.handleChange} />
          <Button type="flat" icon="add" onClick={this.handleAdd} />
        </Addons>
      </div>
    )
  }

  renderPolicy() {
    const options = this.replicasPolicyOptions
    return (
      <Form.Item>
        <TypeSelect
          name="spec.template.spec.affinity"
          options={options}
          defaultValue={options[0].value}
        />
      </Form.Item>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Columns className="is-vcentered is-2">
          <Column className="is-narrow">{this.renderReplicas()}</Column>
          <Column>{this.renderPolicy()}</Column>
        </Columns>
      </div>
    )
  }
}
