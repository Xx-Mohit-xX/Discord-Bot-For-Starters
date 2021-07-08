const db = require("old-wio.db");

const { MessageEmbed } = require("discord.js");

const Discord = require("discord.js");

var pattern = new RegExp(
  "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

module.exports = {
  name: "embedsay",
  usage: "embedsay <msg>",
  description: "Make the bot say something in embed",
  category: "main",
  run: (client, message, args) => {
    //Start

    message.delete();

    let Content = args.join(" ");

    if (!Content)
      return message.channel.send(`Please Give Me Something To Say!`);

    function UrlCheck(str) {
      return pattern.test(str);
    }

    if (UrlCheck(Content) === true) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(
          `Links Is Not Allowed | Only Administrators Can Use Links!`
        );
      }
    }

    let embed = new Discord.MessageEmbed()
      .setColor("42ABFB")
      .setDescription(`${Content}`);

    return message.channel.send(embed);

    //End
  }
};
