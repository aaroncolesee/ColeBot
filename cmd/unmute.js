//unmute [user] - unmutes a user
module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Unmuting a user...');

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to manage messages!");
      toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!toMute) return message.channel.send("You did not specify a user mention or ID!");
      role = message.guild.roles.find(r => r.name === "muted by ColeBot");
      if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");
      await toMute.removeRole(role);
      message.channel.send("I have unmuted him!")

  msg.delete();
}

module.exports.help = {
  name: "unmute",
  description: "Unmutes a user",
  usage: ".unmute [user]"
}
