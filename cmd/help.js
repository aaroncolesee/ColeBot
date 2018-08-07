//help - displays more information about a command
const fs = require("fs");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(args == '') return message.channel.send('Help on what?');

    let msg = await message.channel.send('Sending help...');

    fs.readdir("./cmd", (err, files) => {
        if(err) console.error(err);

        files.forEach((f, i) => {
            let props = require(`./${f}`);
            name = props.help.name;
            if(name == args[0]){
                description = props.help.description;
                usage = props.help.usage;

                let embed = new Discord.RichEmbed()
                    .setColor("#FF69B4")
                    .setTitle('.' + name)
                    .setDescription(description)
                    .addField("Usage:", usage);

                // message.channel.send({embed: embed});
                message.channel.send(`**.${name}** ${description}\n\n **Usage**: ${usage}`);
            }
        
        });
    });

    msg.delete();
}

module.exports.help = {
    name: "help",
    description: "Displays more information about a command",
    usage: ".help [command]"
}
