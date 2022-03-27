const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('node:fs');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, guildId, token} = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName('mine').setDescription('Use this command to mine for elements to make money and upgrade you equipment.'),
]
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
