describe('browse projects page tests (direct nav)', () => {
  beforeEach(() => {
    cy.visit('/browse-projects?page=1&size=10&sort=data_quality')
  })

  it('displays a list of projects on the browse projects page', () => {
    cy.get('.card-list-item.card.focusable')
      .its('length')
      .should('be.greaterThan', 1)
  })

  it('properly filters projects by language', () => {
    cy.get('input[value="C"]')
      .check({ force: true })
      // using wait not ideal: https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-Waiting
      // this will have to be refactored but was the only way I could get the test to pass
      // aliasing the api endpoint route and passing that alias to wait looks the most promising:
      // https://docs.cypress.io/api/commands/wait.html#Alias
      // https://docs.cypress.io/api/commands/route.html#Examples
      .wait(3000)
      .get('.card-list-item.card.focusable')
      .each((item) => {
        cy.wrap(item)
          .within(() => {
            cy.contains('dl > dd > span.language', /^c$/i)
            .should('exist')
          })
      })
  })
})
