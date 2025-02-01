// cypress/integration/navbar.spec.js

describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should render the navbar correctly', () => {
    cy.get('header').should('be.visible');
    cy.get('nav').should('be.visible');
    cy.get('.logo').should('contain.text', 'Furniro');
  });

  it('should toggle the mobile menu', () => {
    cy.get('.HiOutlineMenuAlt2').click();
    cy.get('ul[style*="left: 0%"]').should('be.visible');
    cy.get('ul[style*="left: 0%"] li').first().click();
    cy.get('ul[style*="left: -100%"]').should('not.be.visible');
  });

  it('should navigate to correct pages', () => {
    cy.get('a[href="/shop"]').click();
    cy.url().should('include', '/shop');
    cy.go('back');
    cy.get('a[href="/blog"]').click();
    cy.url().should('include', '/blog');
    cy.go('back');
    cy.get('a[href="/contact"]').click();
    cy.url().should('include', '/contact');
  });

  it('should render user button and icons correctly', () => {
    cy.get('.icons').should('be.visible');
    cy.get('.AiOutlineShoppingCart').should('be.visible');
    cy.get('.CiHeart').should('be.visible');
  });
});