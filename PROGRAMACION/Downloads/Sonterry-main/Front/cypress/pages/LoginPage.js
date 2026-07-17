class LoginPage {
  visit() {
    cy.visit('/login')
    return this
  }

  fillEmail(email) {
    cy.dataCy('input-email').clear().type(email)
    return this
  }

  fillPassword(password) {
    cy.dataCy('input-password').clear().type(password)
    return this
  }

  submit() {
    cy.dataCy('submit-login').click()
    return this
  }

  expectSuccess() {
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.dataCy('auth-toast').should('be.visible')
    return this
  }

  expectError() {
    cy.url().should('include', '/login')
    cy.dataCy('auth-toast').should('be.visible')
    return this
  }
}

export default LoginPage
