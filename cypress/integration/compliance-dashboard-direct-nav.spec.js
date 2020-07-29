describe('federal agencies page tests (direct nav)', () => {
  beforeEach(() => {
    cy.visit('/federal-agencies/compliance/dashboard')
  })

  it('has the proper verbiage', () => {
    cy.contains('#agencycompliance', /compliance/i).should('exist')
  })

  it('contains the compliance dashboard component', () => {
    cy.get('.dashboard-container').should('exist')
  })
})
