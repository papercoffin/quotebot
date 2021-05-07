//Variables
var ownerID = "655475175185448985"
const prefix = 'q!'

//Packages
const Discord = require('discord.js')
const client = new Discord.Client({presence: {status: 'online', activity: {name: 'q!'}}, disableMentions: 'everyone'})
const http = require('http')
const express = require('express')
const app = express()

//Page
var port = (process.env.PORT || 0)
app.get('/', (req, res) => res.sendStatus(200))
app.listen(port, () => console.log('Listening at port ' + port))
setInterval(() => {http.get("https://quotebot1.herokuapp.com/")}, 280000)

// Ready.
client.once('ready', () => {console.log('---')})

// Message Event Listener.
client.on('message', message => 
{
    var embed = Discord.MessageEmbed();
    const embedColor = "#fff4d4";

    // When a user sends and pastes a link to a Discord message, the bot will display it in an embed.
    if (message.content.startsWith("https://discord.com/channels/")) 
    {
        var parts = message.content.split('/'), quoteEmbed = new Discord.MessageEmbed();
        message.delete();
        client.channels.cache.get(parts[5]).messages.fetch(parts[6]).then(nMessage =>
        {
            quoteEmbed.setColor(embedColor);
            quoteEmbed.setAuthor(nMessage.author.tag, nMessage.author.displayAvatarURL({ format: 'png', dynamic: true }));
            quoteEmbed.setDescription(nMessage.content + '\n[[Jump to Message]](' + message.content + ')');
            quoteEmbed.setImage((Array.from(nMessage.attachments.values(), x => x.url)[0]));
            quoteEmbed.setFooter(`ID: ${nMessage.id}`);
            quoteEmbed.setTimestamp(nMessage.createdAt);

            // Sends the resulting embed.
            message.channel.send(quoteEmbed);
        });
    }

    // Command detector.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    // Checks if there is a command within the commands folder named the given input.
    if (!client.commands.has(command)) return;

    // If there is, tries to execute it.
    try 
    {
        client.commands.get(command).execute(message, args);
    } 
    catch (error) 
    {
        console.error(error);
        message.channel.send('There was an error trying to execute that command!');
    }
});

// Token.
client.login(process.env.TOKEN)

//Token
client.login(process.env.TOKEN)
