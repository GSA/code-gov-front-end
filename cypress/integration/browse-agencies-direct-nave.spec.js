describe('browse agencies page tests (direct nav)', () => {
  beforeEach(() => {
    cy.visit('/agencies')
  })

  it('displays a list of projects on the browse agencies page', () => {
    cy.get('.card-list-item')
      .its('length')
      .should('be.greaterThan', 1)
  })

  it('properly filters projects', () => {
    cy.get('input[value="USAID"]')
      .click({ force: true })
      .get('input[value="DOC"]')
      .check({ force: true })
      // using wait not ideal: https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-Waiting
      // this will have to be refactored but was the only way I could get the test to pass
      // aliasing the api endpoint route and passing that alias to wait looks the most promising:
      // https://docs.cypress.io/api/commands/wait.html#Alias
      // https://docs.cypress.io/api/commands/route.html#Examples
      .get('.filter-tags')
      .each(item => {
        cy.wrap(item).within(() => {
          cy.contains('button', /Department/i).should('exist')
        })
      })
  })
})
