// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create variables
const Date = new Date();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/** EVENT: CLIENT : READY */
client.once('ready', () => {
    console.log('**********************************************************');
    console.log('* GOLD RUSH DISCORD BOT READY | ' + Date.getDate() + '/' + Date.getMonth() + '/' + Date.getFullYear() + ' *');
    console.log('**********************************************************');
});

/** BOT TOKEN */
client.login(token);