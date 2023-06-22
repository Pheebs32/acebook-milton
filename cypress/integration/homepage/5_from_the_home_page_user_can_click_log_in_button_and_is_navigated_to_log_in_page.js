describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get("button.explore-btn").contains("Login").click();
    cy.get(".title").should("contain", "Log in");
  });
});
