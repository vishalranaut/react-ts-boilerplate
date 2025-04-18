describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form with correct fields', () => {
    // Check form title
    cy.contains('Log In').should('be.visible');
    
    // Check form fields
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    
    // Check submit button
    cy.contains('button', 'Log In').should('be.visible');
    
    // Check signup link
    cy.contains('Create one here').should('be.visible');
  });

  it('should validate required fields', () => {
    // Submit without filling any fields
    cy.contains('button', 'Log In').click();
    
    // Check for validation messages
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('should validate email format', () => {
    // Enter invalid email
    cy.get('input[id="email"]').type('invalid-email');
    cy.get('input[id="email"]').blur();
    
    // Check for validation message
    cy.contains('Please enter a valid email address').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    // Enter valid credentials
    cy.get('input[id="email"]').type('user@example.com');
    cy.get('input[id="password"]').type('password123');
    
    // Submit form
    cy.contains('button', 'Log In').click();
    
    // Check redirect to dashboard
    cy.url().should('include', '/dashboard');
    
    // Check for dashboard content
    cy.contains('Welcome to Your Dashboard').should('be.visible');
  });

  it('should show error message with invalid credentials', () => {
    // Enter invalid credentials
    cy.get('input[id="email"]').type('wrong@example.com');
    cy.get('input[id="password"]').type('wrongpassword');
    
    // Submit form
    cy.contains('button', 'Log In').click();
    
    // Check for error message
    cy.contains('Invalid email or password').should('be.visible');
  });
});