describe('User Sign Up - Password Boundary Value', () => {
    it('should display an error message for an invalid password length', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const username = 'Tester1'
        const validEmail = 'test@test.com';
        const invalidPassword = 'no';

        cy.visit('/users/signup');

        //sign up
        cy.get("#username").type(username);
        cy.get("#email").type(validEmail);
        cy.get("#password").type(invalidPassword);
        cy.get("#submit-signup-button").click();

        // Assert that the user stays on the signup page
        cy.url().should('include', '/users/signup');

        // Assert that the error message is displayed
        cy.on('window:alert',(t)=>{
            //assertions
            expect(t).to.contains('You must enter a valid password');
        });
    });
});