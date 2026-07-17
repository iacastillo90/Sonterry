import LoginPage from '../pages/LoginPage'
import users from '../fixtures/users.json'

describe('Login', () => {
  beforeEach(() => {
    cy.resetAuth()
  })

  it('R-LOG-1: logs in successfully with valid credentials', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Login successful',
        data: {
          user: { id: 1, name: 'Test User', email: 'test@example.com' },
          token: 'fake-jwt-token',
        },
      },
    }).as('loginRequest')

    cy.intercept('GET', '/api/cart', {
      body: { success: true, data: [] },
    }).as('cartRequest')

    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.fillEmail(users.valid.email)
    loginPage.fillPassword(users.valid.password)
    loginPage.submit()

    cy.wait('@loginRequest')
    cy.wait('@cartRequest')
    loginPage.expectSuccess()
  })

  it('R-LOG-2: shows error for unregistered email', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { success: false, message: 'Credenciales inválidas' },
    }).as('loginFail')

    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.fillEmail(users.unregistered.email)
    loginPage.fillPassword(users.unregistered.password)
    loginPage.submit()

    cy.wait('@loginFail')
    loginPage.expectError()
  })

  it('R-LOG-3: shows error for wrong password', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { success: false, message: 'Credenciales inválidas' },
    }).as('loginFail')

    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.fillEmail(users.valid.email)
    loginPage.fillPassword('WrongPassword123!')
    loginPage.submit()

    cy.wait('@loginFail')
    loginPage.expectError()
  })

  it('R-LOG-4: shows lockout error when account is locked (429)', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 429,
      body: { success: false, message: 'Demasiados intentos. Cuenta bloqueada temporalmente.' },
    }).as('loginLockout')

    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.fillEmail(users.valid.email)
    loginPage.fillPassword(users.valid.password)
    loginPage.submit()

    cy.wait('@loginLockout')
    loginPage.expectError()
  })
})
