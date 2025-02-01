describe("HomeProducts Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/"); // Adjust this if the component is inside another route
  });

  it("should show the loading state initially", () => {
    cy.get("[data-testid='loading']").should("exist");
  });

  it("should display products correctly after loading", () => {
    cy.intercept("GET", "**/api/products", { fixture: "products.json" }).as("fetchProducts");
    cy.wait("@fetchProducts");

    cy.get("[data-testid='product-item']").should("have.length", 8); // Checks if 8 products are rendered

    cy.get("[data-testid='product-title']").first().should("be.visible");
    cy.get("[data-testid='product-image']").first().should("be.visible");
    cy.get("[data-testid='product-price']").first().should("be.visible");
  });

  it("should display a discount badge if applicable", () => {
    cy.get("[data-testid='discount-badge']").each(($badge) => {
      cy.wrap($badge).should("be.visible");
    });
  });

  it("should show 'Available for Rent' if the product is for rental", () => {
    cy.get("[data-testid='rental-badge']").each(($badge) => {
      cy.wrap($badge).should("be.visible");
    });
  });

  it("should show 'Out of Stock' if the product is unavailable", () => {
    cy.get("[data-testid='stock-status']").each(($status) => {
      cy.wrap($status)
        .invoke("text")
        .then((text) => {
          if (text.includes("Out of Stock")) {
            cy.wrap($status).should("have.class", "text-red-500");
          } else {
            cy.wrap($status).should("have.class", "text-green-700");
          }
        });
    });
  });

  it("should show error page if fetching products fails", () => {
    cy.intercept("GET", "**/api/products", { statusCode: 500 }).as("fetchError");
    cy.wait("@fetchError");

    cy.get("[data-testid='error-page']").should("exist");
  });
});
