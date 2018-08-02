//subscribe - allows a user to subscribe to a channel feed
module.exports.run = async (bot, message, args) => {

    if(args == '') return message.channel.send('Subscribe to what?');

    let msg = await message.channel.send('Subscribing to ' + args[0] + '...');

    if(!message.guild.channels.exists('name', args[0])) return message.channel.send('Feed does not exist!');
    if(!message.guild.channels.find('name', args[0]).parent.name == 'feeds') return message.channel.send('Feed does not exist!');
    
    self = message.guild.member(message.author);
    role = message.guild.roles.find(r => r.name === args[0] + "-subscriber");
    if(!role){
        try{
            role = await message.guild.createRole({
                name: args[0] + "-subscriber",
                color: "#000000",
                permissions: []
            });
            await message.guild.channels.find('name', args[0]).overwritePermissions(role, {
                READ_MESSAGES: true,
                SEND_MESSAGES: false
                });
        }catch(e){
            console.log(e.stack);
        }
      }

    if(self.roles.exists('name', args[0] + '-subscriber')) return message.channel.send('You are already subscribed to ' + args[0] + '.');

    await self.addRole(role);

    message.channel.send('You have successfully subscribed to ' + args[0] + '!');

    msg.delete();
}

module.exports.help = {
    name: "subscribe"
}
  