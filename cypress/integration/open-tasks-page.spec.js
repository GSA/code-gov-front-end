describe('open task page tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .get('li button[class="usa-accordion__button usa-nav__link"]')
      .contains(/developers/i)
      .click({ force: true })
      .get('ul[class="usa-nav__submenu"] > li[class="usa-nav__submenu-item"] > a')
      .contains(/open tasks/i)
      .click({ force: true })
  })

  it('filters by federal agency', () => {
    const agency = 'GSA'
    cy.get(`input[value="${agency}"]`)
      .check({ force: true })
      .location('search')
      .should('include', agency)
  })
})
