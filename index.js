const { token } = require("./config.json");
const { Client, Collection } = require('discord.js');
const discord = require("discord.js");
const bot = new Client({ disableMentions: 'everyone',
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const client = new discord.Client({
  disableEveryone: true 
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.login(token);