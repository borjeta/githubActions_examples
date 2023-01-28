
const { exec } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
/*importamos la libreria para obtener un meme al azar */
const { meme } = require('memejs');




/*Obtenemos el nombre del repositorio , el token de github */
const repo = core.getInput('repo');
const token = core.getInput('token');
/*Hacemos una peticion a la api de memejs para obtener un meme al azar */

            

    /* hacemos un fetch a la api de memejs para obtener un meme al azar 
    fetch('https://meme-api.herokuapp.com/gimme',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    
    })
        .then(response => response.json())
        .then(data => {
            /* obtenemos la url del meme
            const meme = data.url;
        });
        */
    /* editamos nuestro readme */

    fs.readFile('readme.md', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        /* obtenemos el meme y lo añadimos al readme */
        const result = data.replace(/(https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.jpg)/g, meme);
        fs.writeFile('readme.md', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });


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



