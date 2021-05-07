//Variables
var ownerID = "YOURID"
const prefix = 'PREFIX'

//Packages
const Discord = require('discord.js')
const client = new Discord.Client({presence: {status: 'online', activity: {name: 'GAME'}}, disableMentions: 'everyone'})
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
client.on('message', message => {

  try {

  //Anything past this line will not happen if the message is not sent in a guild (server)
  if (!message.guild) return;

  //Anything past this line will not happen if the message is not sent by an user account.
  if (message.author.bot || message.system) return;

  //Anything past this line will not happen if the message has no prefix.
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  //Arguments
  var msgCon = message.content.toLowerCase()
  var args = message.content.split(' ')
  var argresult = args.slice(1).join(' ')

  //Message Attachments
  if (message.attachments.size) {var msgAtt = Array.from(message.attachments.values(), x => x.url)}

  //Classic say command
  if (msgCon.startsWith(prefix + 'say') && (argresult ||  msgAtt)) {
    message.channel.send(argresult, {files: msgAtt})
    message.delete()}

  //Evaluate command
  if (msgCon.startsWith(prefix + 'eval ') && message.author.id === ownerID) {
    eval(argresult)}

  } catch(error) {console.log('Trigger: ' + message.content + ' | ' + error)}})

//Token
client.login(process.env.TOKEN)
