describe('federal agencies page tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .get('li button[class="usa-accordion__button usa-nav__link"]')
      .contains(/guidance/i)
      .click({ force: true })
  })

  it('visits the compliance dashboard page', () => {
    cy.get('ul[class="usa-nav__submenu"] > li[class="usa-nav__submenu-item"] > a')
      .contains(/agency compliance/i)
      .click({ force: true })
      .get('#agencycompliance')
      .should('exist')
  })
})
