describe("User Sign Up - Cancel Button Functionality", () => {
    it("A user clicks the cancel button on log in page and the form is cleared", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');

    // sign up
    cy.visit("/users/signup");
    cy.get("#username").type("Tester");
    cy.get("#email").type("Test@test.com");
    cy.get("#password").type("Tester1!");
    cy.get("#cancel").click();

    // check that username, email and password fields are cleared

    cy.get("#username").should('have.value', '');
    cy.get("#email").should('have.value', '');
    cy.get("#password").should('have.value', '');
    });
});