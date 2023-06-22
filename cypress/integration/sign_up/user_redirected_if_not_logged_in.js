describe('User Sign Up/Log in - User is redirected if not logged in', () => {
    it('user redirected to "/login" if trying to manually access "/posts" whilsts not logged in', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        cy.visit('/posts');
        cy.url().should('include', '/sessions/login');
    });
});