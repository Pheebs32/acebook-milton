describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get("button.explore-btn").contains("Signup").click();
    cy.get("title").should("contain", "Sign-up");
  });
});
