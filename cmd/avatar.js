//avatar - shows author's avatar
module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Generating avatar...');

  await message.channel.send({files: [
    {
      attachment: message.author.displayAvatarURL,
      name: "avatar.png"
    }
  ]});

  msg.delete();
}

module.exports.help = {
  name: "avatar",
  description: "Displays the user's own avatar",
  usage: ".avatar"
}
