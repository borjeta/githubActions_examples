
const { exec } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { meme } = require('memejs');
const repo = core.getInput('repo');
const token = core.getInput('token');

// programa para modificar el readme cada vez que se haga un push

/* obtenemos el readme de la rama github_action_readme */
const readme = fs.readFileSync('readme.md', 'utf8');


/* Cogemos el numero de commits que hay en el repositorio */

/* y escribimos hola mundo en el readme */
const newReadme = readme + `Hola mundo`;

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



