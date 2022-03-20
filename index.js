/** REQUIRE DISCORD.JS CLASSES */
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

/** CREATE CLIENT INSTANCE */
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/** GLOBAL VARIABLES */
const LOG_MESSAGE_LENGTH = 80;
const LOG_MESSAGE_LENGTH_MAX = LOG_MESSAGE_LENGTH - 4;



/** EVENT: CLIENT : READY */
client.once('ready', () => {
    sendLogMessage('GOLD RUSH DISCORD BOT STARTED');
});


/** EVENT: CLIENT : INTERACTIONCREATE */
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});


/** BOT TOKEN */
client.login(token);

function sendLogMessage(message) {
    //is this wrong?
    const DATE = new Date();

    let DATE_TIME_STRING = DATE.getMonth() + '/' + DATE.getDate() + '/'  + DATE.getFullYear() + ' | ' +
      DATE.getHours() + ':' + DATE.getMinutes() + ':'  + DATE.getSeconds() + ':'  + DATE.getMilliseconds();

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