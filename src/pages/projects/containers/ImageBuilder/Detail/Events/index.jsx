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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { joinSelector } from 'utils'
import EventStore from 'stores/event'

import EventsCard from 'components/Cards/Events'

class Events extends React.Component {
  constructor(props) {
    super(props)

    this.eventStore = new EventStore()
    this.fetchData()
  }

  get store() {
    return this.props.s2iRunStore
  }

  get namespace() {
    return this.store.jobDetail.namespace
  }

  fetchData = () => {
    const { uid, name, namespace } = this.store.jobDetail

    const fields = {
      'involvedObject.name': name,
      'involvedObject.namespace': namespace,
      'involvedObject.kind': 'Job',
      'involvedObject.uid': uid,
    }

    this.eventStore.fetchList({
      namespace: this.namespace,
      fieldSelector: joinSelector(fields),
    })
  }

  render() {
    const { data, isLoading } = toJS(this.eventStore.list)

    return <EventsCard data={data} loading={isLoading} />
  }
}

export default inject('rootStore')(observer(Events))
export const Component = Events
