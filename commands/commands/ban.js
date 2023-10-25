	/**
 * @file discord.js v14 Ban Command
 * @description A command that allows a bot to ban a user in a Discord server using discord.js v14.
 * 
 * @requires discord.js v14
 */
 
    const { Client, Intents } = require('discord.js');
 
    // Create a new Discord client
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.BANS] });
     
    // Define your bot token
    const token = 'YOUR_BOT_TOKEN';
     
    // Event: ready
    // Triggered when the bot is ready and connected to Discord
    client.once('ready', () => {
      console.log('Bot is ready!');
    });
     
    // Event: messageCreate
    // Triggered when a message is sent in a channel the bot has access to
    client.on('messageCreate', async (message) => {
      // Check if the message starts with the command prefix
      if (message.content.startsWith('!ban')) {
        // Split the message content into an array of arguments
        const args = message.content.slice(5).trim().split(/ +/);
        
        // Check if the user mentioned a member to ban
        if (!message.mentions.members.first()) {
          return message.reply('Please mention a user to ban.');
        }
        
        // Get the member to ban
        const memberToBan = message.mentions.members.first();
        
        try {
          // Ban the member
          await memberToBan.ban();
          
          // Send a success message
          message.channel.send(`Successfully banned ${memberToBan.user.tag}.`);
        } catch (error) {
          // Log the error message
          console.error('Error banning member:', error);
          
          // Send an error message
          message.channel.send('An error occurred while banning the member.');
        }
      }
    });