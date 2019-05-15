describe('about page tests', () => {
  it('visits the about/overview page', () => {
    cy.visit('/')
    cy.get('li a[role="menuitem"]')
      .contains('ABOUT')
      .click()
      .get('ul[role="menu"] > li > a')
      .contains('OVERVIEW')
      .click()
      .get('#aboutthesourcecodepolicy')
      .should('contain', 'Source Code')
  })
})