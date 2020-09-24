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

describe('The Nodes Page', function() {
  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    cy.server()

    cy.route('GET', /\/nodes/).as('getNodes')

    cy.visit('/infrastructure/nodes')

    cy.wait('@getNodes')

    cy.get('.ks-table tbody.table-tbody > tr')
      .its('length')
      .should('be.gt', 0)

    cy.get('.ks-table tbody.table-tbody > tr')
      .first()
      .find('a')
      .click()
    cy.url().should('include', 'status')
  })
})
