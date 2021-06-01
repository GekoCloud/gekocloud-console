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

import React from 'react'
import { renderIntoCanvas } from 'utils/tracing'

export default class CanvasGraph extends React.Component {
  constructor(props) {
    super(props)

    this.canvas = React.createRef()
  }

  componentDidMount() {
    this.drawCanvas()
  }

  getColor = name => this.props.data.serviceColorMap[name]

  drawCanvas() {
    if (this.canvas && this.canvas.current) {
      const { data } = this.props
      const items = data.spans.map(span => ({
        valueOffset: span.relativeStartTime,
        valueWidth: span.duration,
        serviceName: span.process.serviceName,
      }))

      renderIntoCanvas(this.canvas.current, items, data.duration, this.getColor)
    }
  }

  render() {
    return <canvas ref={this.canvas} />
  }
}
