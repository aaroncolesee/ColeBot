//mute [user] - mutes a user
module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Muting a user...');

      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to manage messages!");
      toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!toMute) return message.channel.send("You did not specify a user mention or ID!");

      if(toMute.id === message.author.id) return message.channel.sendMessage("You cannot mute yourself!");
      if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute a user who has the same or higher role than you!");

      role = message.guild.roles.find(r => r.name === "muted by ColeBot");
      if(!role){
        try{
          role = await message.guild.createRole({
            name: "muted by ColeBot",
            color: "#000000",
            permissions: []
          });
          message.guild.channels.forEach(async (channel, id) =>{
            await channel.overwritePermissions(role, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");
      await toMute.addRole(role);
      message.channel.send("I have muted him!")

  msg.delete();
}

module.exports.help = {
  name: "mute",
  description: "Mutes a user",
  usage: ".mute [user]"
}
