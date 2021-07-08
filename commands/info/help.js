const Discord = require('discord.js')
const fs = require("fs");
const db = require("old-wio.db");
const { stripIndents } = require("common-tags");
const { default_prefix } = require("../../config.json")
const { support } = require("../../config.json");

module.exports = {
  name: "help",
  description: "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    let Categories = ["fun", "info", "main",  "moderation"],
    AllCommands = [];

const Emotes = {
    fun: "🎮 Fun",
    info: "🔎  Info",
    main: "🤖 Main",
    moderation: "⚠️ Mod"
};

for (let i = 0; i < Categories.length; i++) {
    const Cmds = await client.commands.filter(C => C.category === Categories[i]).array().map(C => C.name).sort((a, b) => a < b ? -1 : 1).join(", ");
    AllCommands.push(`\n\n**${Emotes[Categories[i]]}**\n\`\`\`${Cmds}\`\`\``);
};

const Description = `My Prefix For **${message.guild.name}** Is **${default_prefix}**\n\nFor More Command Information, Type The Following Command:\n**${default_prefix}help <command Name>**`;

const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Commands", message.author.avatarURL({
        dynamic: true
    }))
    .setDescription(Description + AllCommands.join("") + "" + "\n\n" + "**Links -**" + ` [Join Support](${support})`)
    .setFooter(`Requested by ${message.author.username}`, client.user.displayAvatarURL())
    .setTimestamp();

if (!args[0]) return message.channel.send(Embed);

else {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(client.user.displayAvatarURL())

    let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
    command = command.config

    embed.setDescription(stripIndents`
    ** Command -** \`${command.name.slice(0).toUpperCase() + command.name.slice(1)}\`\n
    ** Description -** \`${command.description || "No Description provided."}\`\n
    ** Usage -** [   \`${command.usage ? `${command.usage}` : "No Usage"}\`   ]\n
    ** Examples -** \`${command.example ? `${command.example}` : "No Examples Found"}\`\n
    ** Aliases -** [ \`${command.aliases ? command.aliases.join(" , ") : "None."}\` ]`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.channel.send(embed)
};
}}
