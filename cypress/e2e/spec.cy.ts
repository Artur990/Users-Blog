export const myLocalUrlLogin = "http://localhost:3000/login";

describe("template spec", () => {
  it("passes", () => {
    cy.visit(myLocalUrlLogin);

    // cy.get("DOŁĄCZ TERAZ").click();
    // cy.contains("DOŁĄCZ TERAZ").click();

    // Should be on a new URL which
    // includes '/commands/actions'
    // cy.url().should("include", "/login");
    cy.get("#email").type("art@wp.pl");
    cy.get("#password").type("123456");
    cy.get("#button").click();
    cy.url().should("include", "/");
  });
});
