// variables
var ownerID = "655475175185448985"
const { prefix } = require('./config.json');

// packages
const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client();
const http = require('http')
const express = require('express')
const app = express()

//command stuff
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// page
var port = (process.env.PORT || 0)
app.get('/', (req, res) => res.sendStatus(200))
app.listen(port, () => console.log('Listening at port ' + port))
setInterval(() => {http.get("https://quotebot1.herokuapp.com/")}, 280000)

// ready
client.once('ready', () => {console.log('---')})

client.on('message', message => 
{

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  // message quoting
  if (message.content.startsWith("https://discord.com/channels/")) 
  {
    var parts = message.content.split('/'), quoteEmbed = new Discord.MessageEmbed();

    message.delete(); // deletes initial message

    client.channels.cache.get(parts[5]).messages.fetch(parts[6]).then(nMessage =>
    {
      // embed settings
      quoteEmbed.setColor('#fff4d4');
      quoteEmbed.setAuthor(nMessage.author.tag, nMessage.author.displayAvatarURL({ format: 'png', dynamic: true }));
      quoteEmbed.setDescription(nMessage.content + '\n[[Jump to Message]](' + message.content + ')');
      quoteEmbed.setImage((Array.from(nMessage.attachments.values(), x => x.url)[0]));
      quoteEmbed.setFooter(`ID: ${nMessage.id}`);
      quoteEmbed.setTimestamp(nMessage.createdAt);

      // sends embed
      message.channel.send(quoteEmbed);
    });
  }

  if (!client.commands.has(command)) return;

	try 
  {
		client.commands.get(command).execute(message, args);
	} 
  
  catch (error) 
  {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

});

//Token
client.login(process.env.TOKEN)