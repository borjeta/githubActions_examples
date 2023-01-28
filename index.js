
const  exec  = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const repo = core.getInput('repo');
const token = core.getInput('token');
const axios = require('axios');
const memejs = require('memejs');




/* obtenemos el readme de la rama github_action_readme */
const readme = fs.readFileSync('readme.md', 'utf8');
/*Obtenemos los memes de la api de imgflip y cargamos las url en un array */
/* usamos axios para hacer la peticion a la api */
const memes = axios.get('https://api.imgflip.com/get_memes')
    .then((response) => {
        const memes = response.data.data.memes;
        console.log(memes);
        const memesUrl = [];
        memes.forEach((meme) => {
            /*por cada url del array de memes, reemplazamos el https:\/\/i.imgflip.com\/ por https://i.imgflip.com/ */
            meme.url = meme.url.replace('https:\\/\\/i.imgflip.com\\/', 'https://i.imgflip.com/');

            memesUrl.push(meme.url);
        });
        return memesUrl;
    })
    .catch((error) => {
        console.log(error);
    });
/*
editamos nuestro readme añadiendo un meme aletaroio de la api de imgflip
*/
const editReadme = async () => {
    const memesUrl = await memes;
    const meme = memesUrl[Math.floor(Math.random() * memesUrl.length)];
    const newReadme = readme + meme;
    fs.writeFileSync('readme.md', `<p></p><img src="${meme}" alt="meme" />`, 'utf8');
};
editReadme();

//Ya


