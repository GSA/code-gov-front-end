describe('homepage search box (non-mobile)', () => {
  let defaultSearchString
  let searchPrep
  beforeEach(() => {
    defaultSearchString = 'nasa'
    searchPrep = (searchString) => {
      cy.visit('/')
      cy.get('input[data-testid="input-search-box"]')
        .type(searchString)
        .get('button[data-testid="button-search-box"]')
        .click()
    }
  })

  it('can perform a search using the homepage search box', () => {
    searchPrep(defaultSearchString)
  })

  it('then navigates to a page with the proper query parameters', () => {
    searchPrep(defaultSearchString)
    cy.location('search').should('include', `=${defaultSearchString}`)
  })

  it('then displays a list of projects for a search term known to have at least one project', () => {
    searchPrep(defaultSearchString)
    cy.get('.card-list-item')
      .its('length')
      .should('be.greaterThan', 0)
  })

  it('displays no projects for a search term known to have no projects', () => {
    searchPrep('thugnificent')
    cy.get('.card-list-item')
      .should('not.exist')
  })
})
