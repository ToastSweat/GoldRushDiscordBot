/** REQUIRE DISCORD.JS CLASSES */
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');


/** CREATE CLIENT INSTANCE */
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}



/** GLOBAL VARIABLES */
const LOG_MESSAGE_LENGTH = 80;
const LOG_MESSAGE_LENGTH_MAX = LOG_MESSAGE_LENGTH - 4;



/** EVENT: CLIENT : READY */
client.once('ready', (c) => {
  sendLogMessage('LOGGED IN AS : ' + c.user.tag);
  sendLogMessage('GOLD RUSH DISCORD BOT STARTED');
});


/** EVENT: CLIENT : INTERACTIONCREATE */
client.on('interactionCreate', async interaction => {
  console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});


/** BOT TOKEN */
client.login(token);

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