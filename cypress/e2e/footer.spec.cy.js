/// <reference types="cypress" />

describe("Footer Component", () => {
  beforeEach(() => {
    // Visit the home page where the Footer is rendered
    cy.visit("http://localhost:3000");
  });

  it("should render the footer sections", () => {
    // Check if the footer sections are rendered correctly
    cy.get("footer").should("be.visible");

    // Check if the Funiro logo and address are displayed in the first section
    cy.get("footer .sec1 h1").contains("Funiro.");
    cy.get("footer .sec1 p").contains("400 University Drive Suite 200 Coral Gables, FL 33134 USA");

    // Check if the Links section is rendered
    cy.get("footer .sec2 h3").contains("Links");
    cy.get("footer .sec2 ul").should("have.length.greaterThan", 0); // Ensure there are links inside the Links section
    cy.get("footer .sec2 li").contains("Home");
    cy.get("footer .sec2 li").contains("Shop");
    cy.get("footer .sec2 li").contains("About");
    cy.get("footer .sec2 li").contains("Contact");

    // Check if the Help section is rendered
    cy.get("footer .sec3 h3").contains("Help");
    cy.get("footer .sec3 ul").should("have.length.greaterThan", 0); // Ensure there are links inside the Help section
    cy.get("footer .sec3 li").contains("Payment Options");
    cy.get("footer .sec3 li").contains("Returns");
    cy.get("footer .sec3 li").contains("Privacy Policies");

    // Check if the Newsletter section is rendered
    cy.get("footer .sec4 h3").contains("Newsletter");
    cy.get("footer .sec4 form").should("be.visible");
  });

  it("should allow the user to subscribe to the newsletter", () => {
    // Check if the email input and subscribe button are visible
    cy.get("footer .sec4 input").should("be.visible");
    cy.get("footer .sec4 button").should("be.visible");

    // Simulate entering an email and clicking subscribe
    cy.get("footer .sec4 input")
      .type("testuser@example.com")
      .should("have.value", "testuser@example.com"); // Check the input value
    cy.get("footer .sec4 button").click();

    // After clicking the subscribe button, you can assert that the form submission works,
    // and you can either check for success notification, URL redirection, or a success message.
    // For now, assuming the button click triggers the form submission, we expect no errors.
    cy.get("footer .sec4 input").should("have.value", ""); // Ensure input is cleared after submission
  });

  it("should display the copyright text", () => {
    // Check if the copyright text is displayed
    cy.get("footer").contains("2024 funiro. All rights reserved");
  });

  it("should have working links that redirect to the correct pages", () => {
    // Check if the links in the Links section are working
    cy.get("footer .sec2 li a").each((link) => {
      cy.wrap(link).click();
      cy.url().should("not.eq", "http://localhost:3000"); // Ensure it navigates to a different page
    });

    // Check if the links in the Help section are working
    cy.get("footer .sec3 li a").each((link) => {
      cy.wrap(link).click();
      cy.url().should("not.eq", "http://localhost:3000"); // Ensure it navigates to a different page
    });
  });
});
