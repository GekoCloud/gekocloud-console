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
import { get } from 'lodash'
import { Form, SearchSelect } from 'components/Base'
import { MODULE_KIND_MAP } from 'utils/constants'
import ProjectStore from 'stores/project'
import VolumeStore from 'stores/volume'

export default class Source extends React.Component {
  state = {
    namespaces: { data: [] },
    volumes: { data: [] },
  }

  namespaceStore = new ProjectStore()

  volumeStore = new VolumeStore()

  get namespaceOpts() {
    const { namespaces } = this.state
    return namespaces.data.map(namespace => ({
      label: namespace.name,
      value: namespace.name,
    }))
  }

  get volumesOpts() {
    const { volumes } = this.state
    return volumes.data.map(volume => ({
      label: volume.name,
      value: volume.name,
      rest: volume,
    }))
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  async componentDidMount() {
    await this.namespaceStore.fetchList()
    const { list: namespaces } = this.namespaceStore
    this.setState({
      namespaces,
    })
    const firstNS = get(namespaces, 'data[0].name')
    const selectNS = get(this.formTemplate, 'meta.namespace', firstNS)

    if (selectNS) {
      await this.volumeStore.fetchList({ namespace: selectNS })
      const { list: volumes } = this.volumeStore
      this.setState({
        volumes,
      })
    }
  }

  handleNamespaceChange = async namespace => {
    await this.volumeStore.fetchList({ namespace })
    const { list: volumes } = this.volumeStore
    this.setState({
      volumes,
    })
  }

  render() {
    const { formRef } = this.props
    const { namespaces, volumes } = this.state
    const defaultValue = get(namespaces, 'data[0].name')
    const defaultVolume = get(volumes, 'data[0].name')
    const defaultStorageClass = get(volumes, 'data[0].storageClassName')

    return (
      <div>
        <Form data={this.formTemplate} ref={formRef}>
          <Form.Item
            label={t('Project')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <SearchSelect
              name={'metadata.namespace'}
              defaultValue={defaultValue}
              page={namespaces.page}
              total={namespaces.total}
              isLoading={namespaces.isLoading}
              options={this.namespaceOpts}
              currentLength={namespaces.data.length}
              onChange={this.handleNamespaceChange}
              onFetch={this.updateNamespace}
            />
          </Form.Item>

          <Form.Item
            label={t('Volume')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <SearchSelect
              name={'spec.source.name'}
              defaultValue={defaultVolume}
              page={volumes.page}
              total={volumes.total}
              isLoading={volumes.isLoading}
              options={this.volumesOpts}
              currentLength={volumes.data.length}
              onChange={this.handleVolumeChange}
              onFetch={this.updateStorageClass}
            />
          </Form.Item>

          <Form.Item>
            <input
              type="input"
              defaultValue={defaultStorageClass}
              name={'spec.snapshotClassName'}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}