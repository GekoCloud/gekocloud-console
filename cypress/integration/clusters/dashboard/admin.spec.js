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

describe('The Dashboard Page', function() {
  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    cy.server()
    cy.route('GET', /\/nodes/).as('getNodes')

    cy.visit('/dashboard')
    cy.wait('@getNodes')

    cy.get('[data-test="dashboard-header"]').should(
      'contain',
      Cypress.env('username')
    )
  })

  it('successfully links', function() {
    cy.server()
    cy.route('GET', /\/nodes/).as('getNodes')

    cy.visit('/dashboard')
    cy.wait('@getNodes')

    cy.get('a[href="/workspaces"]')
      .its('length')
      .should('be.eq', 2)

    cy.visit('/dashboard')
    cy.wait('@getNodes')

    cy.get('a[href="/accounts"]')
      .its('length')
      .should('be.eq', 2)

    cy.visit('/dashboard')
    cy.wait('@getNodes')

    cy.contains('Node Online Status').click()
    cy.url().should('include', '/nodes')

    cy.visit('/dashboard')
    cy.wait('@getNodes')
    cy.get('img[src="/assets/smartkube_logo.png"]').click()
    cy.url().should('include', '/components')
  })

  it('usage ranking', function() {
    cy.server()
    cy.route('GET', /\/nodes/).as('getNodes')

    cy.visit('/dashboard')
    cy.wait('@getNodes')

    cy.get('[data-tab="node"]').click()
    cy.get('[data-test="ranking"] tbody.table-tbody > tr')
      .its('length')
      .should('be.gt', 0)

    cy.get('[data-tab="workspace"]').click()
    cy.get('[data-test="ranking"] tbody.table-tbody > tr')
      .its('length')
      .should('be.gt', 0)
  })
})
