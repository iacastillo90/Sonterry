import RegisterPage from '../pages/RegisterPage'
import users from '../fixtures/users.json'

describe('Register', () => {
  beforeEach(() => {
    cy.resetAuth()
  })

  it('registers successfully with valid data', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Registro exitoso',
        data: {
          user: { id: 2, name: 'Test User', email: 'test@example.com' },
          token: 'fake-jwt-token',
          refreshToken: 'fake-refresh-token',
        },
      },
    }).as('registerRequest')

    cy.intercept('GET', '/api/cart', {
      body: { success: true, data: [] },
    }).as('cartRequest')

    const page = new RegisterPage()
    page.visit()
    page.fillName(users.valid.name)
    page.fillEmail(users.valid.email)
    page.fillPassword(users.valid.password)
    page.submit()

    cy.wait('@registerRequest')
    cy.wait('@cartRequest')
    page.expectSuccess()
  })

  it('shows error when name is too short', () => {
    const page = new RegisterPage()
    page.visit()
    page.fillName('A')
    page.fillEmail('test@test.com')
    page.fillPassword('Password123!')
    page.submit()
    page.expectValidationError()
  })

  it('shows error when email is invalid', () => {
    const page = new RegisterPage()
    page.visit()
    page.fillName('Test User')
    page.fillEmail('invalid-email')
    page.fillPassword('Password123!')
    page.submit()
    page.expectValidationError()
  })

  it('shows error when password is too short', () => {
    const page = new RegisterPage()
    page.visit()
    page.fillName('Test User')
    page.fillEmail('test@test.com')
    page.fillPassword('Ab1!')
    page.submit()
    page.expectValidationError()
  })

  it('shows error for duplicate email', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
      body: {
        success: false,
        message: 'El email ya está registrado',
      },
    }).as('registerFail')

    const page = new RegisterPage()
    page.visit()
    page.fillName(users.duplicate.name)
    page.fillEmail(users.duplicate.email)
    page.fillPassword(users.duplicate.password)
    page.submit()

    cy.wait('@registerFail')
    page.expectError()
  })
})
