//nusubscribe - allows a user to unsubscribe to a channel feed
module.exports.run = async (bot, message, args) => {

    if(args == '') return message.channel.send('Unsubscribe from what?');

    let msg = await message.channel.send('Unsubscribing from ' + args[0] + '...');

    if(!message.guild.channels.exists('name', args[0])) return message.channel.send('Feed does not exist!');
    
    self = message.guild.member(message.author);
    role = message.guild.roles.find(r => r.name === args[0] + "-subscriber");

    if(!self.roles.exists('name', args[0] + '-subscriber')) return message.channel.send('You are not subscribed to ' + args[0] + '.');

    await self.removeRole(role);

    message.channel.send('You have successfully unsubscribed from ' + args[0] + '!');

    msg.delete();
}

module.exports.help = {
    name: "unsubscribe"
}
  