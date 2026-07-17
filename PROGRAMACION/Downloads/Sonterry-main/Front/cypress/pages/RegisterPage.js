class RegisterPage {
  visit() {
    cy.visit('/register')
    return this
  }

  fillName(name) {
    cy.dataCy('input-name').clear().type(name)
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
    cy.dataCy('submit-register').click()
    return this
  }

  expectSuccess() {
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.dataCy('auth-toast').should('be.visible')
    return this
  }

  expectError() {
    cy.url().should('include', '/register')
    cy.dataCy('auth-toast').should('be.visible')
    return this
  }

  expectValidationError() {
    cy.url().should('include', '/register')
    return this
  }
}

export default RegisterPage
