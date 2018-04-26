//search [word]- search for the meaning of the word
const api = '';
const snekfetch = require('snekfetch');
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Generating result...');

  msg.delete();
}

module.exports.help = {
  name: "seach"
}
