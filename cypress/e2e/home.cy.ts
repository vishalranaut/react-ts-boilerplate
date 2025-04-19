describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Layout and Content", () => {
    it("should display the hero section correctly", () => {
      cy.get("h1").contains("Welcome to DynamicApp");
      cy.get("p").contains("Experience the power of dynamic content rendering");
      cy.get('img[alt="hero"]')
        .should("have.attr", "src")
        .and("include", "pexels-photo");
    });

    it("should display all features", () => {
      cy.get(".card").should("have.length", 4);

      // Check each feature
      const features = [
        "Dynamic Forms",
        "Custom Validation",
        "Responsive Design",
        "Dark Theme",
      ];

      features.forEach((feature) => {
        cy.contains(".card", feature).should("be.visible");
      });
    });

    it("should have working navigation links", () => {
      cy.get("nav").within(() => {
        cy.get("a").contains("Home").should("have.class", "active");
        cy.get("a").contains("Login").click();
        cy.url().should("include", "/login");

        cy.get("a").contains("Sign Up").click();
        cy.url().should("include", "/signup");

        cy.get("a").contains("Home").click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      });
    });
  });

  describe("Responsive Design", () => {
    it("should be responsive on mobile", () => {
      cy.viewport("iphone-x");
      cy.get("nav").should("be.visible");
      cy.get(".navbar-toggler").should("be.visible").click();
      cy.get(".navbar-collapse").should("be.visible");
    });

    it("should be responsive on tablet", () => {
      cy.viewport("ipad-2");
      cy.get("nav").should("be.visible");
      cy.get(".card").should("have.length", 4);
    });

    it("should be responsive on desktop", () => {
      cy.viewport(1920, 1080);
      cy.get("nav").should("be.visible");
      cy.get(".card").should("have.length", 4);
    });
  });

  describe("Authentication State", () => {
    it("should show login/signup buttons when not authenticated", () => {
      cy.get("a").contains("Log In").should("be.visible");
      cy.get("a").contains("Sign Up").should("be.visible");
    });

    it("should show logout button when authenticated", () => {
      cy.login("user@example.com", "password123");
      cy.get("button").contains("Logout").should("be.visible");
      cy.get("a").contains("Log In").should("not.exist");
      cy.get("a").contains("Sign Up").should("not.exist");
    });
  });
});
