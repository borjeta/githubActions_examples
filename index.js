// main.js que utilizando Nodejs (la librería node-telegram-bot-api) enviará un mensaje a 722271252

// Importamos la librería node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');

// hacemos las peticiones para obtener los tokens de github
const core = require('@actions/core');
const { exit } = require('process');

//Cogemos los secrets Telegram_Token y el Telegram_ChatID de las variables de entorno definidas en github

const TOKEN = core.getInput('TOKEN');
const CHAT_ID = 1198034886;
const NOMBRE = core.getInput('NOMBRE');

// Creamos un bot que utiliza 'polling' para obtener actualizaciones
const bot = new TelegramBot(TOKEN, { polling: true });
//Le ponemos nombre y lo ponemos en escucha de mensajes
async function enviamensaja(nombre) {
    // Enviamos el mensaje
    await bot.sendMessage(1198034886, `Hola ${nombre}!`);
    await bot.stopPolling();
    await process.exit(0);
}

enviamensaja(NOMBRE);