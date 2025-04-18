describe('Protected Routes Tests', () => {
  it('should redirect to login when accessing protected route without authentication', () => {
    // Try to access dashboard without logging in
    cy.visit('/dashboard');
    
    // Check redirect to login
    cy.url().should('include', '/login');
  });

  it('should allow access to protected route after authentication', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[id="email"]').type('user@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.contains('button', 'Log In').click();
    
    // Access dashboard
    cy.visit('/dashboard');
    
    // Check that we're on the dashboard page
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome to Your Dashboard').should('be.visible');
  });

  it('should maintain authentication after page refresh', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[id="email"]').type('user@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.contains('button', 'Log In').click();
    
    // Check that we're on the dashboard page
    cy.url().should('include', '/dashboard');
    
    // Refresh the page
    cy.reload();
    
    // Check that we're still on the dashboard page
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome to Your Dashboard').should('be.visible');
  });

  it('should redirect to home after logout', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[id="email"]').type('user@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.contains('button', 'Log In').click();
    
    // Click logout
    cy.contains('Logout').click();
    
    // Check redirect to home
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});