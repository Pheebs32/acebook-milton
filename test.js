// This is a graphical user interface to run all the different test suites - no more cli. To use this you must first run <npm install express child_process> and then run <node test.js> in the terminal 

// NOTE : This runs on port 3001 - navigate there to run your tests!


const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <h1> Integration Test GUI </h1>
            <h2> Click a button below to run specific tests </h2>
            <body>
                <p>
                <button onClick="window.location.href='/run/test:entry_point'">Run entry_point tests</button>

                <button onClick="window.location.href='/run/test:homepage'"> Run homepage tests</button>

                <button onClick="window.location.href='/run/test:login_and_out'"> Run login and logout tests</button>

                <button onClick="window.location.href='/run/test:posts'">Run posts tests</button>

                <button onClick="window.location.href='/run/test:sign_up'"> Run sign up tests</button>

                <!-- Add more buttons as needed -->
                </p>
            </body>
        </html>
    `);
});

app.get('/run/:test', (req, res) => {
    const testCommand = req.params.test;

    exec(`npm run ${testCommand}`, (error, stdout, stderr) => {
        if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    });

    res.send(`Running ${testCommand}... Check the terminal for output.`);
});

app.listen(port, () => {
    console.log(`Test runner app listening at http://localhost:${port}`);
});

