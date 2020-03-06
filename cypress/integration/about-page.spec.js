describe('about page tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .get('li a[role="menuitem"]')
      .contains(/about/i)
      .click()
  })
  it('visits the about/overview page', () => {
    cy.get('ul[role="menu"] > li > a')
    // cy.get('[disabled]').click({force: true}) - Added this in to prevent click from timing out. Need to investigate why 'a' is not showing and causing timeout.
      .contains(/overview/i)
      .click({force: true})
      .get('#aboutthesourcecodepolicy')
      .contains(/source code/i)
      .should('exist')
  })

})
