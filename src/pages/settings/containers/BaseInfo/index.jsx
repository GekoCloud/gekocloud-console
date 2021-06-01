/*
 * This file is part of SmartKube Console.
 * Copyright (C) 2019 The SmartKube Console Authors.
 *
 * SmartKube Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartKube Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with SmartKube Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react'
import { Panel, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { getDocsUrl } from 'utils'

import styles from './index.scss'

export default class BaseInfo extends Component {
  state = {
    showEdit: false,
  }

  showEdit = () => {
    this.setState({ showEdit: true })
  }

  hideEdit = () => {
    this.setState({ showEdit: false })
  }

  handleEdit = () => {}

  render() {
    return (
      <div>
        <Banner
          icon="home"
          title={t('Platform Info')}
          description={t('PLATFORM_INFO_DESC')}
        />
        <Panel title={t('Basic Info')}>
          <div className={styles.header}>
            <Text
              icon="image"
              title={location.host}
              description={t('Platform URL')}
            />
            <a
              href={`${getDocsUrl('custom_console')}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('HOW_TO_MODIFY_PLATFORM_INFO')}
            </a>
          </div>
          <div className={styles.content}>
            <div className={styles.image}>
              <img src="/assets/logo.svg" alt="" />
            </div>
            <div className={styles.info}>
              <Text
                title={globals.config.title}
                description={t('Platform Title')}
              />
              <Text
                title={globals.config.description || t('KS_DESCRIPTION')}
                description={t('Platform Description')}
              />
            </div>
          </div>
        </Panel>
      </div>
    )
  }
}
