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
setInterval(() => {http.get("https://quotebot1.herokuapp.com/")}, 280000)

//Ready
client.once('ready', () => {console.log('---')})

client.on('message', message => 
{
  // Responses using if/else statements.
  
  // Pings the bot to check for activity.
  if (message.content === `${prefix}ping`) 
  {
    message.channel.send('Pong!');
  }

  // When a user sends and pastes a link to a Discord message, the bot will display it in an embed.
  if (message.content.startsWith("https://discord.com/channels/")) 
  {
    var parts = message.content.split('/'), quoteEmbed = new Discord.MessageEmbed();
    message.delete();
    client.channels.cache.get(parts[5]).messages.fetch(parts[6]).then(nMessage =>
    {
      quoteEmbed.setColor('#ffd885');
      quoteEmbed.setAuthor(nMessage.author.tag, nMessage.author.displayAvatarURL({ format: 'png', dynamic: true }));
      quoteEmbed.setDescription(nMessage.content + '\n[[Jump to Message]](' + message.content + ')');
      quoteEmbed.setImage((Array.from(nMessage.attachments.values(), x => x.url)[0]));
      quoteEmbed.setFooter(`ID: ${nMessage.id}`);
      quoteEmbed.setTimestamp(nMessage.createdAt);

      // Sends the embed.
      message.channel.send(quoteEmbed);
    });
  }
  
});

//Token
client.login(process.env.TOKEN)