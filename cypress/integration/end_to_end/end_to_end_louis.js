describe("End to end - louis", () => {
    it("A user can sign up, log in, create a post, see it in the timeline, like it, unlike it, navigate to profile, edit it then delete the post and logout", () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');

        // navigate to homepage
        cy.visit("/");

        //navigate to sign up
        cy.get('button.explore-btn').contains('Signup').click();

        // fill in sign up form
        cy.get("#username").type("Louis");
        cy.get("#email").type("louis@example.com");
        cy.get("#password").type("mPgaN5s51g!");
        cy.get("#submit-signup-button").click();

        // check redirect to log in
        cy.url().should("contain", "/sessions/login")

        // fill in login form
        cy.get("#email").type("louis@example.com");
        cy.get("#password").type("mPgaN5s51g!");

        // click the log in button
        cy.get("#submit-login-button").click();

        // check redirect to timeline
        cy.get('h1').contains('Posts Timeline')

        // navigate to the new post page by clicking the link
        cy.contains('a', 'Create New Post').click();

        // fill in the information
        cy.get("#new-post-form").find('[type="text"]').type("The Earth is a very small stage in a vast cosmic arena. Think of the endless cruelties visited by the inhabitants of one corner of this pixel on the scarcely distinguishable inhabitants of some other corner.");

        // submit the form
        cy.get("#new-post-form").submit();
        
        // check redirect to timeline and the new post is visible
        cy.get(".posts").should("contain", "The Earth is a very small stage in a vast cosmic arena. Think of the endless cruelties visited by the inhabitants of one corner of this pixel on the scarcely distinguishable inhabitants of some other corner.");

        // click like
        cy.get("#likes-form").submit();

        // check the like increments
        cy.get(".posts").should("contain", "1 like");

        // click like again
        cy.get("#likes-form").submit();

        // check the like count decreases
        cy.get(".posts").should("contain", "0 likes");

        // navigate to profile
        cy.contains('a', 'Profile').click();

        // check my post is present
        cy.get(".content").should("contain", "The Earth is a very small stage in a vast cosmic arena. Think of the endless cruelties visited by the inhabitants of one corner of this pixel on the scarcely distinguishable inhabitants of some other corner.");

        // click the edit button
        cy.contains('button', 'Edit').click();

        // edit my post, clear the text and type a new string
        cy.get('#content').clear().type("It has been said that astronomy is a humbling and character-building experience. There is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world.");

        // submit the changes
        cy.contains('button', 'Update Post').click();

        //check its visible
        cy.get(".content").should("contain", "It has been said that astronomy is a humbling and character-building experience. There is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world.");

        // click the edit button
        cy.contains('button', 'Edit').click();

        // click the delete button
        cy.contains('button', 'Delete Post').click();

        // check the post is no longer visible
        cy.get(".content").should('not.exist');

        // log out
        cy.contains('a', 'Logout').click();

        // check url matches login
        cy.url().should("contain", "/sessions/login")

    });
});
