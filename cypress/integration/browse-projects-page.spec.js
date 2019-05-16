describe('browse projects page tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('ul[role="menubar"] > li > a')
      .contains(/browse projects/i)
      .click()
  })

  it('can navigate to browse projects from the homepage', () => {
    cy.location('pathname').should('include', 'browse-projects')
  })

  it('displays a list of projects on the browse projects page', () => {
    cy.get('.card-list-item')
      .its('length')
      .should('be.greaterThan', 1)
  })

  it('filters projects by language', () => {
    cy.get('input[value="C"]')
      .check({ force: true })
      .wait(3000)
      .get('.card-list-item')
      .each((item) => {
        cy.wrap(item)
          .within(() => {
            cy.contains('dl > dd > span', 'c')
            .should('exist')
          })
      })
  })
})
