/**
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
 * [] Stats per server
 * [] Global Stats
 * []
 */


/** IMPORTS */
const fs = require('node:fs');
const {Client, Collection, Intents} = require('discord.js');
const {clientId, guildId, token} = require('./config.json');


/** CREATE CLIENT INSTANCE */
const CLIENT = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});


/** CLIENT PROPERTIES */
CLIENT.commands = new Collection();


/** COMMANDS SETUP */
const COMMAND_FILES = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of COMMAND_FILES) {
  const COMMAND = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  CLIENT.commands.set(COMMAND.data.name, COMMAND);
}


/** GLOBAL VARIABLES */
const LOG_MESSAGE_LENGTH = 80;
const LOG_MESSAGE_LENGTH_MAX = LOG_MESSAGE_LENGTH - 4;


/** EVENT : ready : once */
CLIENT.once('ready', (c) => {
  sendLogMessage('GOLD RUSH DISCORD BOT STARTED');
  sendLogMessage('LOGGED IN AS : ' + c.user.tag);
});


/** EVENT : interactionCreate : on */
CLIENT.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = CLIENT.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});


/** EVENTS */
CLIENT.on('messageCreate', (message) => {
  if (message.content === 'ding') {
    message.reply({
      content: 'dong',
    });
  }
});


/** COMMANDS */


/** BOT TOKEN */
CLIENT.login(token);


/** UTILITIES */
function sendLogMessage(message) {
  // is this wrong?
  const DATE = new Date();

  const DATE_TIME_STRING = DATE.getHours() + ':' + DATE.getMinutes() + ':' + DATE.getSeconds() + ':' + DATE.getMilliseconds() + ' | ' + DATE.getMonth() + '/' + DATE.getDate() + '/' + DATE.getFullYear();

  function truncateLogString(log) {
    if (log.length > LOG_MESSAGE_LENGTH_MAX) {
      log = log.substring(0, LOG_MESSAGE_LENGTH_MAX);
    } else {
      while (log.length < LOG_MESSAGE_LENGTH_MAX) {
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