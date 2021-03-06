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

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { assign } from 'lodash'
import FullScreen from 'components/Modals/FullscreenModal'

import { Home, Search, Detail } from './Logging'

@FullScreen
@observer
export default class LogSearchModal extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
  }

  formStepState = this.initStepState()

  initStepState() {
    const state = observable({
      step: 0,
    })
    state.next = action(() => {
      state.step += 1
    })
    state.pre = action(() => {
      state.step -= 1
    })
    return state
  }

  searchInputState = (() => {
    const state = observable({
      query: [],
      start: '',
      end: '',
      step: '',
      durationAlias: '',
      nextParamsKey: '',
      queryMode: 1,
    })
    return state
  })()

  detailState = (() => {
    const state = observable({
      container: '',
      host: '',
      log: '',
      namespace: '',
      pod: '',
    })

    state.setState = action(newState => {
      assign(state, newState)
    })

    return state
  })()

  formStepConfig = [
    {
      Component: Home,
      props: {
        searchInputState: this.searchInputState,
      },
    },
    {
      Component: Search,
      props: {
        searchInputState: this.searchInputState,
        detailState: this.detailState,
      },
    },
    {
      Component: Detail,
      props: {
        searchInputState: this.searchInputState,
        detailState: this.detailState,
        close: this.props.onCancel,
      },
    },
  ]

  get Content() {
    return this.formStepConfig[this.formStepState.step] || {}
  }

  render() {
    const { Component, props } = this.Content
    if (!Component) {
      return
    }

    return <Component formStepState={this.formStepState} {...props} />
  }
}
