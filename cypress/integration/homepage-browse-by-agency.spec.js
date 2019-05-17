describe('homepage browse by agency', () => {
  let agency
  beforeEach(() => {
    cy.visit('/')
    agency = 'USDA'
  })

  it('can select an option from the dropdown', () => {
    cy.get('select')
      .select(agency)
  })

  it('then navigates to a page with the proper query parameters', () => {
    cy.get('select')
      .select(agency)
      .location('search').should('include', agency.toLowerCase())
  })

  it('only returns results for that agency', () => {
    cy.get('select')
      .select(agency)
      // using wait not ideal: https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-Waiting
      // this will have to be refactored but was the only way I could get the test to pass
      // aliasing the api endpoint route and passing that alias to wait looks the most promising:
      // https://docs.cypress.io/api/commands/wait.html#Alias
      // https://docs.cypress.io/api/commands/route.html#Examples
      .wait(3000)
      .get('.card-list-item')
      .each((item) => {
        cy.wrap(item)
          .within(() => {
            cy.contains('dd > a', /^department of agriculture/i)
            .should('exist')
          })
      })
  })
})
