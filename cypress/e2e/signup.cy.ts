describe('Signup Form Tests', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should display signup form with correct fields', () => {
    // Check form title
    cy.contains('Create an Account').should('be.visible');
    
    // Check form fields
    cy.get('input[id="firstName"]').should('be.visible');
    cy.get('input[id="lastName"]').should('be.visible');
    cy.get('input[id="email"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    cy.get('input[id="confirmPassword"]').should('be.visible');
    cy.get('input[id="terms"]').should('be.visible');
    
    // Check submit button
    cy.contains('button', 'Sign Up').should('be.visible');
    
    // Check login link
    cy.contains('Log in').should('be.visible');
  });

  it('should validate required fields', () => {
    // Submit without filling any fields
    cy.contains('button', 'Sign Up').click();
    
    // Check for validation messages for required fields
    cy.contains('First Name is required').should('be.visible');
    cy.contains('Last Name is required').should('be.visible');
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

  it('should validate password length', () => {
    // Enter short password
    cy.get('input[id="password"]').type('short');
    cy.get('input[id="password"]').blur();
    
    // Check for validation message
    cy.contains('Password must be at least 8 characters').should('be.visible');
  });

  it('should validate password match', () => {
    // Enter different passwords
    cy.get('input[id="password"]').type('password123');
    cy.get('input[id="confirmPassword"]').type('differentpassword');
    cy.get('input[id="confirmPassword"]').blur();
    
    // Check for validation message
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('should signup successfully with valid details', () => {
    // Enter valid details
    cy.get('input[id="firstName"]').type('Jane');
    cy.get('input[id="lastName"]').type('Doe');
    cy.get('input[id="email"]').type('new-user@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('input[id="confirmPassword"]').type('password123');
    cy.get('input[id="terms"]').check();
    
    // Submit form
    cy.contains('button', 'Sign Up').click();
    
    // Check redirect to dashboard
    cy.url().should('include', '/dashboard');
    
    // Check for dashboard content
    cy.contains('Welcome, Jane!').should('be.visible');
  });
});