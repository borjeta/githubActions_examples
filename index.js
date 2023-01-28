
const { exec } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { meme } = require('memejs');
const repo = core.getInput('repo');
const token = core.getInput('token');

// programa para modificar el readme cada vez que se haga un push

/* Cogemos el readme.md y lo guardamos en una variable */
const readme = fs.readFileSync('readme.md', 'utf8');

/* Cogemos el numero de commits que hay en el repositorio */
const commits = exec('git rev-list --count HEAD', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});

/* y actualizamos el readme */
const newReadme = readme.replace(/commits: \d+/, `commits: ${commits}`);

/* guardamos el readme */
fs.writeFileSync('readme.md', newReadme);


    /* hacemos un commit y un push al repositorio */
    exec(`git config --global user.email "
${github.context.actor
        }@users.noreply.github.com"`);
    exec(`git config --global user.name "${github.context.actor}"`);
    exec(`git add .`);
    exec(`git commit -m "pushs"`);
    exec(`git push https://${github.context.actor
        }:${token
        }@github.com/${repo
        }.git github_action_readme`);



