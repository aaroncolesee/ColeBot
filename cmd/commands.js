//commands - shows all the possible commands
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Generating commands...');

  fs.readdir("./cmd", (err, files) => {
    if(err) console.error(err);

    files.forEach((f, i) => {
      let props = require(`./${f}`);
      name = props.help.name;

      message.channel.send(`${name}`);
    });
  });

  msg.delete();
}

module.exports.help = {
  name: "commands",
  description: "Lists all of the possible commands",
  usage: ".commands"
}
