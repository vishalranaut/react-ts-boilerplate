describe("Dynamic Form Component", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  describe("Form Validation", () => {
    it("should validate required fields", () => {
      cy.get("button").contains("Sign In").click();
      cy.contains("Please enter a valid email address");
      cy.contains("Password must be at least 6 characters");
    });

    it("should validate email format", () => {
      cy.get('input[name="email"]').type("invalid-email");
      cy.get("button").contains("Sign In").click();
      cy.contains("Please enter a valid email address");
    });

    it("should validate password length", () => {
      cy.get('input[name="password"]').type("12345");
      cy.get("button").contains("Sign In").click();
      cy.contains("Password must be at least 6 characters");
    });

    it("should clear errors on input change", () => {
      cy.get("button").contains("Sign In").click();
      cy.contains("Please enter a valid email address");

      cy.get('input[name="email"]').type("test@example.com");
      cy.contains("Please enter a valid email address").should("not.exist");
    });
  });

  describe("Form Submission", () => {
    it("should show loading state during submission", () => {
      cy.get('input[name="email"]').type("user@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get("button").contains("Sign In").click();

      cy.get("button").contains("Processing...").should("exist");
      cy.get(".spinner-border").should("exist");
    });

    it("should handle successful submission", () => {
      cy.get('input[name="email"]').type("user@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get("button").contains("Sign In").click();

      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("should handle submission errors", () => {
      cy.get('input[name="email"]').type("wrong@email.com");
      cy.get('input[name="password"]').type("wrongpass");
      cy.get("button").contains("Sign In").click();

      cy.contains("Invalid credentials");
    });
  });
});
