describe('browse projects page tests', () => {
  const mockRepoResponse = {
    total: 3,
    repos: [
      {
        repoID: 'so-much-repo-a',
        name: 'SoMuchRepo_A',
        date: {
          lastModified: '2020-06-26T00:00:00.000Z'
        },
        languages: ['C'],
        score: 1.2
      },
      {
        repoID: 'so-much-repo-b',
        name: 'SoMuchRepo_B',
        date: {
          lastModified: '2000-01-01T00:00:00.001Z'
        },
        languages: ['JavaScript'],
        score: 5.0
      },
      {
        repoID: 'so-much-repo-c',
        name: 'SoMuchRepo_C',
        date: {
          lastModified: '2000-01-01T00:00:00.000Z'
        },
        languages: ['Rust'],
        score: 9.9
      }
    ]
  }

  beforeEach(() => {
    cy.server()
    cy.route({
      url: 'https://api.code.gov/repos*',
      response: JSON.stringify(mockRepoResponse)
    }).as('mockRepoResponse')

    cy.visit('/')
      .get('li a[class="text-base-dark usa-nav__link"]')
      .contains(/projects/i)
      .click({ force: true })
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
      // using wait not ideal: https://docs.cypress.io/guides/references/best-practices.html#Unnecessary-Waiting
      // this will have to be refactored but was the only way I could get the test to pass
      // aliasing the api endpoint route and passing that alias to wait looks the most promising:
      // https://docs.cypress.io/api/commands/wait.html#Alias
      // https://docs.cypress.io/api/commands/route.html#Examples
      .wait(3000)
      .get('.usa-card')
      .each(item => {
        cy.wrap(item).within(() => {
          cy.contains('div > ul > li', 'c').should('exist')
        })
      })
  })

  describe('sorting dropdown', () => {
    it('sorts by repo name in ascending alphabetical order', () => {
      cy.get('select#sort-options').select('A-Z')

      cy.get('.usa-card-group li a.project-link').each(($link, idx) =>
        expect($link.text()).to.equal(mockRepoResponse.repos[idx].name)
      )
    })
    it('sorts by repo score in ascending order', () => {
      cy.get('select#sort-options').select('Data Quality')

      cy.get('.usa-card-group li [aria-label*="data quality score"]').each(($score, idx) =>
        expect(parseFloat($score.text())).to.equal([...mockRepoResponse.repos].reverse()[idx].score)
      )
    })
    it('sorts by most recent last updated date', () => {
      cy.get('select#sort-options').select('Last Updated')

      cy.get('.usa-card-group li span:contains("Last Updated")')
        .parent()
        .each(($date, idx) =>
          expect($date.text().split(': ')[1]).to.equal(
            new Date(mockRepoResponse.repos[idx].date.lastModified).toLocaleDateString('en-us')
          )
        )
    })
  })
})
