describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Login", () => {
    it("should successfully login with valid credentials", () => {
      cy.get("a").contains("Log In").click();
      cy.get("h2").contains("Welcome Back");

      cy.get('input[name="email"]').type("user@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get("button").contains("Sign In").click();

      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      cy.get("button").contains("Logout").should("exist");
    });

    it("should show validation errors for empty fields", () => {
      cy.get("a").contains("Log In").click();
      cy.get("button").contains("Sign In").click();

      cy.contains("Please enter a valid email address");
      cy.contains("Password must be at least 6 characters");
    });

    it("should show error message for invalid credentials", () => {
      cy.get("a").contains("Log In").click();
      cy.get('input[name="email"]').type("wrong@email.com");
      cy.get('input[name="password"]').type("wrongpass");
      cy.get("button").contains("Sign In").click();

      cy.contains("Invalid credentials");
    });
  });

  describe("Signup", () => {
    it("should successfully create a new account", () => {
      cy.get("a").contains("Sign Up").click();
      cy.get("h2").contains("Create Account");

      cy.get('input[name="name"]').type("Test User");
      cy.get('input[name="email"]').type(`test${Date.now()}@example.com`);
      cy.get('input[name="password"]').type("password123");
      cy.get("button").contains("Create Account").click();

      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      cy.get("button").contains("Logout").should("exist");
    });

    it("should show validation errors for empty fields", () => {
      cy.get("a").contains("Sign Up").click();
      cy.get("button").contains("Create Account").click();

      cy.contains("Please enter your full name");
      cy.contains("Please enter a valid email address");
      cy.contains("Password must be at least 8 characters");
    });

    it("should prevent signup with existing email", () => {
      cy.get("a").contains("Sign Up").click();

      cy.get('input[name="name"]').type("Test User");
      cy.get('input[name="email"]').type("user@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get("button").contains("Create Account").click();

      cy.contains("Email already registered");
    });
  });

  describe("Logout", () => {
    it("should successfully logout", () => {
      cy.login("user@example.com", "password123");
      cy.get("button").contains("Logout").click();
      cy.url().should("include", "/login");
    });
  });
});
