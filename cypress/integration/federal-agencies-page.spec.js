describe('federal agencies page tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .get('li a[role="menuitem"]')
      .contains(/federal agencies/i)
      .click()
  })

  it('visits the compliance dashboard page', () => {
    cy.get('ul[role="menu"] > li > a')
      .contains(/compliance dashboard/i)
      .click({force: true})
      .get('#agencycompliance')
      .should('exist')
  })
})
