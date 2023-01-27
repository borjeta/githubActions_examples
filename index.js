const TOKEN = require()

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(secrets.TOKEN, { polling: true });

const CHAT_ID = secrets.CHAT_ID;

console.log('Bot server started in the port 3000');

bot.sendMessage(CHAT_ID, 'Hola, soy un bot');
bot.sendMessage(CHAT_ID, 'Workflow ejecutado correctamente tras el último commit. Saludos '.NOMBRE);

console.log('Mensaje enviado');