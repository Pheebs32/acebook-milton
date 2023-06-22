describe("End To End Test", () => {
    it("Phoebe Swaines' end to end test", () => {
        // clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const user1Name = 'Tester1';
        const user1Email = 'test@test.com';
        const user1Password = 'Tester1!';

        // Sign Up
        cy.visit("/users/signup");
        cy.get("#username").type(user1Name);
        cy.get("#email").type(user1Email);
        cy.get("#password").type(user1Password);
        cy.get("#submit-signup-button").click();
        cy.url().should("include", "/sessions/login");

        // Log In
        cy.get("#email").type(user1Email);
        cy.get("#password").type(user1Password);
        cy.get("#submit-login-button").click();
        cy.url().should("include", "/posts");

        // Create Post
        cy.get('nav > ul > li').contains('Create New Post').click();
        cy.get("#new-post-form").find('[type="text"]').type("Test line");
        cy.get("#new-post-form").submit();
        cy.url().should("include", "/posts");

        // Second Post
        cy.get('nav > ul > li').contains('Create New Post').click();
        cy.get("#new-post-form").find('[type="text"]').type("Test line 2");
        cy.get("#new-post-form").submit();
        cy.url().should("include", "/posts");

        // Like Post
        cy.get("#likes-form").submit()
        cy.get(".posts").should("contain", "1 like");

        // User Profile
        cy.contains("Profile").click();
        cy.contains('p', user1Name);
        cy.contains('p', user1Email);

        // Edit Post
        cy.contains("Edit").click();
        cy.get("#content").type(' edited')
        cy.contains("Update Post").click();
        cy.visit("/posts");
        cy.contains("Test line 2 edited");
        cy.url().should("include", "/posts");

        // Delete Post
        cy.contains("Profile").click();
        cy.contains("Edit").click();
        cy.contains('button', 'Delete Post').click();
        //cy.get(".content").should('not.exist');
        cy.get('li.content').eq(1).should('not.exist');

        // Log Out
        cy.get('nav > ul > li').contains('Logout').click();
        cy.url().should("include", "/sessions/login");


        // Second user signs up and logs in
        const user2Name = 'Tester2';
        const user2Email = 'test2@test.com';
        const user2Password = 'Tester1!2';
        cy.visit("/users/signup");
        cy.get("#username").type(user2Name);
        cy.get("#email").type(user2Email);
        cy.get("#password").type(user2Password);
        cy.get("#submit-signup-button").click();
        cy.url().should("include", "/sessions/login");
        cy.get("#email").type(user2Email);
        cy.get("#password").type(user2Password);
        cy.get("#submit-login-button").click();
        cy.url().should("include", "/posts");

        // Like another users post
        cy.get("#likes-form").submit()
        cy.get(".posts").should("contain", "1 like");

        // Create a post - Review time difference
        cy.get('nav > ul > li').contains('Create New Post').click();
        cy.get("#new-post-form").find('[type="text"]').type("Test line 3");
        cy.get("#new-post-form").submit();
        cy.url().should("include", "/posts");
        const now = new Date();
        const options = { 
            hour: 'numeric', 
            minute: 'numeric' 
        };
        const currentDate = now.toLocaleString('en-GB', options);
        cy.contains(currentDate);
        cy.get('nav > ul > li').contains('Logout').click();
    });
});