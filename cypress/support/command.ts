declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get("button").contains("Sign In").click();
  cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add("logout", () => {
  cy.get("button").contains("Logout").click();
  cy.url().should("include", "/login");
});

export {};
