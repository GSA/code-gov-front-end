describe('browse agencies page tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .get('li a[class="text-base-dark usa-nav__link"]')
      .contains(/agencies/i)
      .click({ force: true })
  })

  it('can navigate to browse projects from the homepage', () => {
    cy.location('pathname').should('include', 'agencies')
  })

  it('displays a list of agencies on the agencies page', () => {
    cy.get('.card-list-item')
      .its('length')
      .should('be.greaterThan', 1)
  })

  it('filters projects by language', () => {
    cy.get('input[value="USAID"]')
      .check({ force: true })
      // using wait not ideal: https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-Waiting
      // this will have to be refactored but was the only way I could get the test to pass
      // aliasing the api endpoint route and passing that alias to wait looks the most promising:
      // https://docs.cypress.io/api/commands/wait.html#Alias
      // https://docs.cypress.io/api/commands/route.html#Examples
      .wait(3000)
      .get('.usa-card')
      .each(item => {
        cy.wrap(item).within(() => {
          cy.contains('div > ul > li', 'c').should('exist')
        })
      })
  })
})
