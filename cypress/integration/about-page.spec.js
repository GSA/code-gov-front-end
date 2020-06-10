describe('about page tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('selects the about menu item', () => {
    cy.get('li a[role="menuitem"]')
      .contains(/about/i)
      .click()
  })
  it('visits the about/overview page', () => {
    cy.get('ul[role="menu"] > li > a')
      .contains(/overview/i)
      .click({ force: true })
      .get('#aboutthesourcecodepolicy')
      .contains(/source code/i)
      .should('exist')
  })
})
