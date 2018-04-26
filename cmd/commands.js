//commands - shows all the possible commands
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Generating commands...');

  fs.readdir("./cmd", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    jsfiles.forEach((f, i) => {
    message.channel.send(`${f}`.substr(0, f.length-3));
    });
  });

  msg.delete();
}

module.exports.help = {
  name: "commands"
}
