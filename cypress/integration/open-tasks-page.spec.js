describe('open task page tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('li a[role="menuitem"]')
      .contains(/developers/i)
      .click()
      .get('ul[role="menu"] > li > a')
      .contains(/open tasks/i)
      .click()
  })

  it('filters by federal agency', () => {
    const agency = 'DOD'
    cy.get(`input[value="${agency}"]`)
      .check()
      .location('search').should('include', agency)
  })
})
