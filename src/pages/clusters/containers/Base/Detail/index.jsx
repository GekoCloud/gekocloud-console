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

import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import { Component as Base } from 'core/containers/Base/Detail/Page'

@withRouter
@inject('rootStore')
export default class DetailPage extends Base {
  get enabledActions() {
    const { cluster } = this.props.match.params
    return globals.app.getActions({
      module: this.authKey,
      cluster,
    })
  }
}