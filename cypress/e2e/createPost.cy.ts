import { myLocalUrlLogin } from "./spec.cy";

const urlCreatePost = "http://localhost:3000/createPost";

describe("template spec", () => {
  it("passes", () => {
    cy.visit(myLocalUrlLogin);
    cy.get("#email").type("art@wp.pl");
    cy.get("#password").type("123456");
    cy.get("#button").click();
    cy.url().should("include", "/");
    cy.visit(urlCreatePost);
    cy.get("#textarea").type("New post");
    cy.get("#button").click();
    cy.url().should("include", "/");
  });
});
