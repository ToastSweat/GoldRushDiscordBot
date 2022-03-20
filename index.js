/** REQUIRE DISCORD.JS CLASSES */
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

/** CREATE CLIENT INSTANCE */
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/** GLOBAL VARIABLES */
const LOG_MESSAGE_LENGTH = 13;
const LOG_MESSAGE_LENGTH_MAX = LOG_MESSAGE_LENGTH - 4;

/** EVENT: CLIENT : READY */
client.once('ready', () => {
    //is this wrong?
    const DATE = new Date();

    let DATE_STRING = DATE.getMonth() + '/' + DATE.getDate() + '/'  + DATE.getFullYear();
    let TIME_STRING = DATE.getHours() + ':' + DATE.getMinutes() + ':'  + DATE.getSeconds() + ':'  + DATE.getMilliseconds();

    if (DATE_STRING.length > LOG_MESSAGE_LENGTH_MAX) {
        DATE_STRING = DATE_STRING.substring(0,LOG_MESSAGE_LENGTH_MAX);
    }else{

    }

    if (TIME_STRING.length > LOG_MESSAGE_LENGTH_MAX) {
        TIME_STRING = TIME_STRING.substring(0,LOG_MESSAGE_LENGTH_MAX);
    }else{

    }

    console.log('*********************************');
    console.log('* GOLD RUSH DISCORD BOT STARTED *');
    console.log('* ' + DATE_STRING + ' *');
    console.log('* ' + TIME_STRING + ' *');
    console.log('*********************************');
});

/** BOT TOKEN */
client.login(token);