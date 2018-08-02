const botsettings = require("./botsettings.json");
const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./cmd/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("No commands to load!");
    return;
  }
  console.log(`Loading ${jsfiles.length} commands...`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmd/${f}`);
    console.log(`${f} loaded.`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready!`);
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  let args = message.content.split(/\s+/g);
  let command = args[0];
  args = args.slice(1);

  if(!command.startsWith(botsettings.prefix)) return;
  let cmd = bot.commands.get(command.slice(botsettings.prefix.length));
  if(cmd) cmd.run(bot, message, args);

})

bot.login(config.token);
