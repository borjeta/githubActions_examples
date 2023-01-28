
const { exec } = require('child_process');

const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

/*Obtenemos el nombre del repositorio*/
const { repo: repoName } = repo;
console.log(`Repo name ${repoName}!`);

/* Obtenemos el nombre del usuario  ,el token de github y el nombre del repositorio*/
const nameToGreet = core.getInput('who-to-greet');
const token = core.getInput('token');
const repo = core.getInput('repo');


exec('node index.js', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return;
    }
    let resultado = stdout;
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
/*Ejecutara un script en bash que el ubuntu donde se ejecuta node en github actions tiene instalado*/

// Language: javascript



try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}

/* Programa que ejecutará el action.yml y que pondra un meme feliz modificando el readme.md de github */

try {

    // Obtenemos el nombre del usuario
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    
    // Obtenemos el nombre del repositorio
    const { context = {} } = github;
    const { repo = {} } = context;
    const { repo: repoName } = repo;
    console.log(`Repo name ${repoName}!`);
    
    // Modificamos el readme.md
    const data = fs.readFileSync('README.md', 'utf8');
    const result = data.replace(/## Hi there 👋/g, `## Hi there 👋\n\n![meme](https://i.imgur.com/8ZQ9Z0m.png)`);
    fs.writeFileSync('README.md', result, 'utf8');

} catch (error) {
    core.setFailed(error.message);
}

// Language: javascript
