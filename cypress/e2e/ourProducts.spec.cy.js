/// <reference types="cypress" />

describe("Our Products Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/"); // Replace with the actual page where OurProducts is used
  });

  it("should display the heading 'Our Products'", () => {
    cy.get("h1").should("contain.text", "Our Products");
  });

  it("should render products", () => {
    cy.get(".RP-card").children().should("have.length.greaterThan", 0);
  });

  it("should navigate to /shop when 'Show More' button is clicked", () => {
    cy.get(".button a").first().click(); // Click the first "Show More" button
    cy.url().should("include", "/shop");
  });

  it("should have a responsive grid layout", () => {
    cy.viewport(1280, 720); // Desktop View
    cy.get(".RP-card").should("have.class", "lg:grid-cols-4");

    cy.viewport(600, 800); // Mobile View
    cy.get(".RP-card").should("have.class", "xs:grid-cols-2");
  });

  it("should check the button styles", () => {
    cy.get(".button a button")
      .should("have.class", "border-[#B88E2F]")
      .and("have.class", "text-[#B88E2F]")
      .and("have.class", "hover:text-[#d6a637]");
  });
});
