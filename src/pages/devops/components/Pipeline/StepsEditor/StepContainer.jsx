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

import { cloneDeep, isEqual } from 'lodash'
import { toJS } from 'mobx'
import React from 'react'

import StepCard from './StepCard'

export default class StepContainer extends React.Component {
  steps = toJS(this.props.steps)

  shouldComponentUpdate(nextProps) {
    if (this.props.listType === 'condition') {
      return true
    }

    const nextSteps = toJS(nextProps.steps)

    if (this.steps && !isEqual(this.steps, nextSteps)) {
      this.steps = cloneDeep(nextSteps)
      return true
    }

    return false
  }

  render() {
    const { steps, zIndex, listType } = this.props

    return (
      <>
        {steps &&
          steps.length > 0 &&
          steps.map((step, index) => (
            <StepCard
              key={JSON.stringify(toJS(step.name)) + index}
              step={toJS(step)}
              index={index}
              zIndex={zIndex}
              listType={listType}
              isLast={steps.length - 1 === index}
            />
          ))}
      </>
    )
  }
}
