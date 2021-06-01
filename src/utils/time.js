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

export const timeUnitAlias2MsMap = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
  d: 1000 * 60 * 60 * 24,
  w: 1000 * 60 * 60 * 24 * 7,
}

export const timeUnitAlias2CompleteTimeMap = {
  s: 'Seconds',
  m: 'Minutes',
  h: 'Hours',
  d: 'Days',
  w: 'Weeks',
}

/**
 * translate '10s' to '10 秒'
 * @param {string} timeAlias
 * @returns {string}
 */
export function translateTimeAlias(timeAlias) {
  try {
    const [, count, unit] = timeAlias.match(/^(\d+)([a-zA-Z])$/)
    return `${count} ${tranlateTimeUnitAlias(unit)}`
  } catch (e) {
    console.error(e)
    return 'invalid timeAlias format'
  }
}

/**
 * translate 's' to '秒’
 * @param {string} timeUnitAlias - format 's', 'm', 'h', 'd', 'w'
 */
export function tranlateTimeUnitAlias(timeUnitAlias) {
  return t(timeUnitAlias2CompleteTimeMap[timeUnitAlias]) || timeUnitAlias
}

export function getMsFromTimeAlias(timeAlias) {
  const { count, unit } = splitTimeAlias(timeAlias)
  return count * timeUnitAlias2MsMap[unit]
}

export function splitTimeAlias(timeAlias) {
  try {
    const [, count, unit] = timeAlias.match(/^(\d+)([a-zA-Z])$/)
    return {
      count,
      unit,
    }
  } catch (e) {
    return {
      count: 0,
      unit: 's',
    }
  }
}
