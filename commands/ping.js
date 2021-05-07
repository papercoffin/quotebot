module.exports = 
{
	name: 'ping',
	description: 'Ping! Check if the bot is online and responsive!',
    
    // Parameters passed into the methods being executed.
    execute(message) 
    {
	    message.channel.send('Pong!');
	},
};