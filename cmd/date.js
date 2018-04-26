//date - shows the current date
module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Generating date...');

  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth()+1;
  var year = d.getFullYear();

  await message.channel.send(`Today is ${month}/${day}/${year}.`);

  msg.delete();
}

module.exports.help = {
  name: "date"
}
