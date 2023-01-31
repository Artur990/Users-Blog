const myLocalUrlLogin = "http://localhost:3000/login";

const reAuth = "http://localhost:3000/reAuth";
const changePassword = "http://localhost:3000/changePassword";
describe("template spec", () => {
  it("passes", () => {
    cy.visit(myLocalUrlLogin);
    cy.get("#email").type("art@wp.pl");
    cy.get("#password").type("123456");
    cy.get("#button").click();
    cy.url().should("include", "/");
    cy.visit(reAuth);
    cy.get("#password").type("123456");
    cy.get("#button").click();
    cy.url().should("include", "/accountSettings");
    cy.visit(changePassword);
    cy.get("#password").type("123456");
    cy.get("#confirmPassword").type("123456");
    cy.get("#button").click();
    cy.url().should("include", "/");
  });
});
