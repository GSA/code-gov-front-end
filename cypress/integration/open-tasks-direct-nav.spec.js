describe('open task page tests (direct navigation to)', () => {
  beforeEach(() => {
    cy.visit('/open-tasks?page=1&size=10')
  })

  it('returns at least one open task', () => {
    cy.get('.card-list-item.card.focusable')
      .its('length')
      .should('be.greaterThan', 0)
  })

  it('adds a query to the url when a filter is applied', () => {
    const agency = 'DOD'
    cy.get(`input[value="${agency}"]`)
      .check({ force: true })
      .location('search').should('include', agency)
  })

  it('correctly filters results by agency', () => {
    const agency = 'DOD'
    cy.get(`input[value="${agency}"]`)
      .check({ force: true })
      .get('.card-list-item.card.focusable')
      .each((item) => {
        cy.wrap(item)
          .within(() => {
            cy.contains('dd > a', /^department of defense/i)
            .should('exist')
          })
      })
  })
})
