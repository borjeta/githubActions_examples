
const { exec } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');



/*Obtenemos el nombre del repositorio , el token de github */
const repo = core.getInput('repo');
const token = core.getInput('token');
/*declaramos la funcion prueba */
async function prueba(resultado) {
    /*llama a la api de memes para obtener un meme al azar */
    const url = 'https://meme-api.herokuapp.com/gimme';
    fetch(url)
        .then(res => res.json())
        .then(json => {
            resultado = 1;
            /*creamos el comentario */
            const comentario = `${resultado}`;
            /*creamos el comentario en el repositorio */
            const octokit = github.getOctokit(token);
            octokit.issues.createComment({
                owner: github.context.repo.owner,
                repo: repo,
                issue_number: github.context.issue.number,
                body: comentario
            });
        });

    /* y con la respuesta del meme modificamos el readme */
    fs.readFile('README.md', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/<h1>.*<\/h1>/g, `<h1>El resultado de la prueba es: ${resultado}</h1>`);

        fs.writeFile('README.md', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

    /* hacemos un commit y un push al repositorio */
    await exec('git add .', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
         exec('git commit -m "prueba"', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
            exec('git push', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
            }
            );
        }
        );
    }
    );

    
    return resultado;


}


prueba().then((resultado) => {
    console.log(resultado);
    if (resultado == 1) {
        core.setOutput("resultado", "1");
    } else {
        core.setOutput("resultado", "0");
    }
}
);
