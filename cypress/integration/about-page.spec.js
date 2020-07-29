describe('about page tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .get('li a')
      .contains(/about/i)
      .click()
  })
  it('visits the about page', () => {
    cy.visit('/')
      .get('li a')
      .contains(/about/i)
      .click()
      .get('#aboutthesourcecodepolicy')
      .contains(/source code/i)
      .should('exist')
  })
})
