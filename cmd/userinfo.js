//userinfo - shows author's user info
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription(`Hello! I'm ${message.author.username}`)
    .setColor("#9B59B6")
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
    .addField("ID", message.author.id)
    .addField("Created on", message.author.createdAt);

  message.channel.send({embed: embed});
}

module.exports.help = {
  name: "userinfo"
}
