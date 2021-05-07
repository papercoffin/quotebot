//Variables
var ownerID = "655475175185448985"
const prefix = 'q!'

//Packages
const Discord = require('discord.js')
const config = require('./config.json');
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
  if (message.content === '!ping') 
  {
		// send back "Pong!" to the channel the message was sent in
		message.channel.send('Pong!');
  }
});

//Token
client.login(process.env.TOKEN)