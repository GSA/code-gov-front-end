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
