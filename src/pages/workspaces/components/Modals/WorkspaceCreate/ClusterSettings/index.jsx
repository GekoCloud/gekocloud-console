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

import { Form } from 'components/Base'
import ClusterSelect from './ClusterSelect'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  render() {
    const { formRef, formTemplate } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('Select Clusters')}</div>
          <p>{t('SELECT_CLUSTERS_DESC')}</p>
        </div>
        <Form data={formTemplate} ref={formRef}>
          <Form.Item label={t('Available Clusters')}>
            <ClusterSelect name="spec.placement.clusters" />
          </Form.Item>
        </Form>
      </div>
    )
  }
}