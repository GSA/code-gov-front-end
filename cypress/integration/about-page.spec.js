describe('about page tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .get('li a[role="menuitem"]')
      .contains(/about/i)
      .click()
  })
  it('visits the about/overview page', () => {
    cy.get('ul[role="menu"] > li > a')
      .contains(/overview/i)
      .click()
      .get('#aboutthesourcecodepolicy')
      .contains(/source code/i)
      .should('exist')
  })

  it('visits the federal source code policy page', () => {
    cy.get('ul[role="menu"] > li > a')
      .contains(/source code policy/i)
      .click()
      .get('#m1621')
      .contains(/m-16-21/i)
      .should('exist')
  })
})
