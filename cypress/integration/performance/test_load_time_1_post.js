// describe("Performance", () => {
//     it("load page with no posts, log load time. create post and reload page. compare times and should be n seconds different", () => {
//         let startTime;
//         //clearDB drops the DB for a fresh test environment
//         cy.task('clearDb');

//         // setup intercepts before the actions
//         cy.intercept("GET", "/posts").as("loadPostsBefore");
//         cy.intercept("GET", "/posts").as("loadPostsAfter");

//         // sign up
//         cy.visit("/users/signup");
//         cy.get("#username").type("User1");
//         cy.get("#email").type("someone@example.com");
//         cy.get("#password").type("mPgaN5s51g!");
//         cy.get("#submit-signup-button").click();

//         // sign in
//         cy.visit("/sessions/login");
//         cy.get("#email").type("someone@example.com");
//         cy.get("#password").type("mPgaN5s51g!");
//         cy.get("#submit-login-button").click();

//         // Visit the posts page and record start time when request is made
//         cy.on('network:request', () => {
//             startTime = Date.now();
//         });
//         cy.visit("/posts");

//         // calculate duration when response is received
//         cy.wait("@loadPostsBefore").then(() => {
//             const loadTimeBefore = Date.now() - startTime;
//             cy.log(`Load time of empty posts page: ${loadTimeBefore} ms`);

//             // loop through the next section to create n posts and increment value each time
//             const numberOfPosts = 1; // Replace with the desired number of posts

//             for (let n = 1; n <= numberOfPosts; n++) {
//                 // nav to new post and submit post
//                 cy.visit("/posts/new");
//                 cy.get("#new-post-form").find('[type="text"]').type("This is post #" + n);
//                 cy.get("#new-post-form").submit();
//             }

//             // Visit the posts page and record start time when next request is made
//             cy.on('network:request', () => {
//                 startTime = Date.now();
//             });
//             cy.visit("/posts");

//             // calculate duration when next response is received
//             cy.wait("@loadPostsAfter").then(() => {
//                 const loadTimeAfter = Date.now() - startTime;
//                 cy.log(`Load time of page with ${numberOfPosts} post: ${loadTimeAfter} ms`);
//             });
//         });
//     });
// });

describe("Performance", () => {
    it("load page with no posts, log load time. create post and reload page. compare times and should be n seconds different", () => {
        let startTime, endTime, emptyResponseTime, populatedResponseTime;
        
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');

        // setup intercepts before the actions
        cy.intercept("GET", "/posts").as("loadPostsBefore");
        cy.intercept("GET", "/posts").as("loadPostsAfter");

        // sign up
        cy.visit("/users/signup");
        cy.get("#username").type("User1");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("mPgaN5s51g!");
        cy.get("#submit-signup-button").click();

        // sign in
        cy.visit("/sessions/login");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("mPgaN5s51g!");
        cy.get("#submit-login-button").click();

        // Visit the posts page and record start time when request is made
        cy.on('network:request', () => {
            startTime = Date.now();
            cy.log(`Start time before request: ${startTime}`);
        });
        cy.visit("/posts");

        // calculate duration when response is received
        
        cy.wait("@loadPostsBefore").then(() => {
            endTime = Date.now();
            cy.log(`Current time after response: ${endTime}`);
            emptyResponseTime = endTime - startTime;
            cy.log(`Time taken: ${emptyResponseTime} ms`);

            // loop through the next section to create n posts and increment value each time
            const numberOfPosts = 1; // Replace with the desired number of posts

            for (let n = 1; n <= numberOfPosts; n++) {
                // nav to new post and submit post
                cy.visit("/posts/new");
                cy.get("#new-post-form").find('[type="text"]').type("This is post #" + n);
                cy.get("#new-post-form").submit();
            }

            // Visit the posts page and record start time when next request is made
            cy.on('network:request', () => {
                startTime = Date.now();
                cy.log(`Start time before next request: ${startTime}`);
            });
            cy.visit("/posts");

            // calculate duration when next response is received
            cy.wait("@loadPostsAfter").then(() => {
                endTime = Date.now();
                cy.log(`Current time after next response: ${endTime}`);
                populatedResponseTime = endTime - startTime;
                cy.log(`Time taken: ${populatedResponseTime} ms`);
            });
        });
    });
});
