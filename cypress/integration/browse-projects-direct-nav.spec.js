describe('browse projects page tests (direct nav)', () => {
  beforeEach(() => {
    cy.visit('/browse-projects?page=1&size=10&sort=data_quality')
  })

  it('displays a list of projects on the browse projects page', () => {
    cy.get('.card-list-item')
      .its('length')
      .should('be.greaterThan', 1)
  })

  it('properly filters projects by language', () => {
    cy.get('#language .moreLessToggle')
      .click({ force: true })
      .get('input[value="HTML"]')
      .check({ force: true })
      // using wait not ideal: https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-Waiting
      // this will have to be refactored but was the only way I could get the test to pass
      // aliasing the api endpoint route and passing that alias to wait looks the most promising:
      // https://docs.cypress.io/api/commands/wait.html#Alias
      // https://docs.cypress.io/api/commands/route.html#Examples
      .get('.filter-tags')
      .each(item => {
        cy.wrap(item).within(() => {
          cy.contains('button', /html/i).should('exist')
        })
      })
  })
})
