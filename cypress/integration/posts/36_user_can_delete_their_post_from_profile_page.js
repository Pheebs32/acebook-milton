describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    
      // sign up
      cy.visit("/users/signup");
      cy.get("#username").type("User1");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-signup-button").click();

      // sign in
      cy.visit("/sessions/login");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-login-button").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Test1");
    cy.get("#new-post-form").submit();
    // get time of post
    const now = new Date();
    const options = { 
      
      hour: 'numeric', 
      minute: 'numeric' 
    };
    const postTime = now.toLocaleString('en-GB', options);

    //got to profile page
    cy.visit("/users/User1")
    cy.contains("Delette").click();
    cy.visit("/posts");
    cy.get("/posts").sould("not.contain","User1" & postTime);

  });
});
