const myLocalUrlRegister = "http://localhost:3000/register";

describe("template spec", () => {
  it("passes", () => {
    cy.visit(myLocalUrlRegister);
    cy.get("#name").type("Artur");
    cy.get("#email").type("art1@wp.pl");
    cy.get("#password").type("123456");
    cy.get("#confirmPassword").type("123456");
    cy.get("#phoneNumber").type("500-100-100");
    cy.get("#button").click();
    cy.url().should("include", "/");
  });
});
