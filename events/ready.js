const db = require("quick.db");
const { Client, Collection } = require('discord.js');
const bot = new Client({ disableMentions: 'everyone',
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

module.exports.run = (client) => {
   const express = require('express')
   const app = express();
   const port = 3000;

app.get('/', (req, res) => res.send('Your bot is alive!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
	console.log(client.user.setActivity(db.get(`status`) || "No Status :D")
	);
	console.log('-------------------------------------'); 
}