/****************************************************
 * TODO
 * [] Exports module for utilities, logs and alert function
 * [] See user message
 * [] Delete user message
 * [] Generate a result
 * [] Display result
 * [] Custom icons for results
 * [] Log results
 * [] Store results in database
 * [] Make money
 * [] Store money to database
 * [] Store all collects in database
 * [] Stats command
 * []
 * []
 * []
 * **************************************************/


/** IMPORTS */
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

//import DiscordJS, { Intents } from 'discord.js';
//import dotenv from 'dotenv';



/** SETUP */
dotenv.config();



/** CREATE CLIENT INSTANCE */
const CLIENT = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})



/** GLOBAL VARIABLES */
const LOG_MESSAGE_LENGTH = 80;
const LOG_MESSAGE_LENGTH_MAX = LOG_MESSAGE_LENGTH - 4;

const GUILD_ID = '858444463432663041';
const GUILD = CLIENT.guilds.cache.get(GUILD_ID);



/** EVENTS */
CLIENT.on('ready', () => {
  sendLogMessage('GOLD RUSH BOT IS READY');
})

CLIENT.once('ready', (c) => {
  sendLogMessage('GOLD RUSH DISCORD BOT STARTED');
  sendLogMessage('LOGGED IN AS : ' + c.user.tag);


});

CLIENT.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply({
      content: 'pong',
    })
  }
})



/** COMMANDS */



/** BOT TOKEN */
CLIENT.login(process.env.TOKEN);



/** UTILITIES */
function sendLogMessage(message) {
    //is this wrong?
    const DATE = new Date();

    let DATE_TIME_STRING = DATE.getHours() + ':' + DATE.getMinutes() + ':'  + DATE.getSeconds() + ':'  + DATE.getMilliseconds() + ' | ' + DATE.getMonth() + '/' + DATE.getDate() + '/'  + DATE.getFullYear();

    function truncateLogString(log) {
      if (log.length > LOG_MESSAGE_LENGTH_MAX) {
        log = log.substring(0,LOG_MESSAGE_LENGTH_MAX);
      }else{
        while(log.length < LOG_MESSAGE_LENGTH_MAX) {
          log = log + ' ';
        }
      }
      return log;
    }

    console.log('');
    console.log('********************************************************************************');
    console.log('* ' + truncateLogString(message) + ' *');
    console.log('* ' + truncateLogString(DATE_TIME_STRING) + ' *');
    console.log('********************************************************************************');
}