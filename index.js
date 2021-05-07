//Variables
var ownerID = "655475175185448985"
const { prefix } = require('./config.json');

//Packages
const Discord = require('discord.js')
const client = new Discord.Client();
const http = require('http')
const express = require('express')
const app = express()

//Page
var port = (process.env.PORT || 0)
app.get('/', (req, res) => res.sendStatus(200))
app.listen(port, () => console.log('Listening at port ' + port))
setInterval(() => {http.get("SITE_URL")}, 280000)

//Ready
client.once('ready', () => {console.log('---')})

//Message Event Listener
client.on('message', message => 
{
  if (message.content === `${prefix}ping`) 
  {
		message.channel.send('Pong!');
  }
});

//Token
client.login(process.env.TOKEN)