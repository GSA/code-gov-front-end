describe('federal agencies page tests (direct nav)', () => {
  beforeEach(() => {
    cy.visit('/about/compliance/dashboard')
  })

  it('has the proper verbiage', () => {
    cy.contains('#agencycompliance', /compliance/i)
      .should('exist')
  })

  it('contains the compliance dashboard web component', () => {
    cy.get('compliance-dashboard')
      .should('exist')
  })
})
