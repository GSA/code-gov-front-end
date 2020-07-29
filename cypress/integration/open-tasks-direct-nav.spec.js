describe('open task page tests (direct navigation to)', () => {
  beforeEach(() => {
    cy.visit('/open-tasks?page=1&size=10')
  })

  it('returns at least one open task', () => {
    cy.get('.usa-card')
      .its('length')
      .should('be.greaterThan', 0)
  })

  it('adds a query to the url when a filter is applied', () => {
    const agency = 'GSA'
    cy.get(`input[value="${agency}"]`)
      .check({ force: true })
      .location('search')
      .should('include', agency)
  })

  it('correctly filters results by agency', () => {
    const agency = 'GSA'
    cy.get(`input[value="${agency}"]`)
      .check({ force: true })
      .get('.usa-card')
      .each(item => {
        cy.wrap(item).within(() => {
          cy.contains('dl > dd > a', /^general services administration/i).should('exist')
        })
      })
  })
})
