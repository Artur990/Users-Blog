const myLocalUrlLogin = "http://localhost:3000/login";

const reAuth = "http://localhost:3000/reAuth";
const changePassword = "http://localhost:3000/changePassword";

const delateAccount = "http://localhost:3000/delateAccount";
describe("template spec", () => {
  it("passes", () => {
    cy.visit(myLocalUrlLogin);
    cy.get("#email").type("art@wp.pl");
    cy.get("#password").type("123456");
    cy.get("#button").click();
    cy.visit(reAuth);
    cy.get("#password").type("123456");
    cy.get("#button").click();
    cy.contains("z").click();
    cy.visit(changePassword);
    cy.url().should("include", "/changePassword");
    cy.get("#p").type("123456");
    cy.get("#c").type("123456");
    cy.contains("W").click();
    cy.url().should("include", "/");
  });
});
