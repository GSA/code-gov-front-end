describe('open task page tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('li a[role="menuitem"]')
      .contains(/developers/i)
      .click()
      .get('ul[role="menu"] > li > a')
      .contains(/open tasks/i)
      .click({force: true})
  })

  it('filters by federal agency', () => {
    const agency = 'GSA'
    cy.get(`input[value="${agency}"]`)
      .check({force: true})
      .location('search').should('include', agency)
  })
})
