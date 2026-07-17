Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`))

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/auth/login', { email, password }).then((response) => {
    expect(response.status).to.eq(200)
    window.localStorage.setItem('st_token', response.body.data.token)
    window.localStorage.setItem('st_user', JSON.stringify(response.body.data.user))
  })
})

Cypress.Commands.add('register', (name, email, password) => {
  cy.request('POST', '/api/auth/register', { name, email, password }).then((response) => {
    expect(response.status).to.eq(201)
    window.localStorage.setItem('st_token', response.body.data.token)
    window.localStorage.setItem('st_user', JSON.stringify(response.body.data.user))
  })
})

Cypress.Commands.add('resetAuth', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
})
