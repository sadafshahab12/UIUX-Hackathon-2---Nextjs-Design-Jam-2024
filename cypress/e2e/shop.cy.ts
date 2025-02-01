describe("Shop Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/shop");
  });

  it("should display the shop hero section", () => {
    cy.get("[data-testid='shop-hero']").should("be.visible");
  });

  it("should allow searching for a product", () => {
    cy.get("input[placeholder='Search']").type("Table");
    cy.get("[data-testid='search-results'] li").should("exist");
  });

  it("should allow selecting a product category", () => {
    cy.get("[data-testid='category-select']").click();
    cy.get("[data-testid='category-bed']").click();
    cy.get("[data-testid='shop-products']").should("contain", "Bed");
  });

  it("should paginate products correctly", () => {
    cy.get("[data-testid='pagination-next']").click();
    cy.get("[data-testid='pagination-current']").should("contain", "2");
  });
});
