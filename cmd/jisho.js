//jisho [word]- search jisho for the meaning of the word
const api = 'http://jisho.org/api/v1/search/words?keyword=';
const snekfetch = require('snekfetch');
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Generating result...');

  snekfetch.get(api + args[0]).then(r =>{
    let body = r.body;
    let data = body.data[0];
    if(data == undefined){
      message.channel.send("No such word exists!");
      return;
    }
    let japanese_word = data.japanese[0].word;
    let reading = data.japanese[0].reading;

    let field1 = '';

    let embed = new Discord.RichEmbed()
      .setAuthor('Jisho.org')
      .setColor('GREEN');

    if(japanese_word != undefined) field1 += japanese_word;
    if(field1 != '' ) field1 += '[' + reading + ']';
    else field1 += reading;

    embed = embed.setDescription(field1)

    for(var j=0; j<3; j++){
      let japanese_word = [];
      let reading = [];
      let english_definition = '';
      let part_of_speech = '';
      let tag = '';
      let see_also = '';
      let field2 = '';

      let sense = data.senses[j];
      if(sense == undefined) break;

      let english_definition_array = sense.english_definitions;
      for(var i=0; i<english_definition_array.length-1; i++) english_definition += english_definition_array[i] + '; ';
      english_definition += english_definition_array[english_definition_array.length-1];

      let part_of_speech_array = sense.parts_of_speech;
      for(var i=0; i<part_of_speech_array.length-1; i++) part_of_speech += part_of_speech_array[i] + ', ';
      part_of_speech += part_of_speech_array[part_of_speech_array.length-1];

      let tag_array = sense.tags;
      for(var i=0; i<tag_array.length-1; i++) tag += tag_array[i] + ', ';
      tag += tag_array[tag_array.length-1];

      let see_also_array = sense.see_also;
      for(var i=0; i<see_also_array.length-1; i++) see_also += see_also_array[i] + ', ';
      see_also += see_also_array[see_also_array.length-1];

      if(part_of_speech != 'undefined' || tag != 'undefined' || see_also != 'undefined') field2 += '| ';
      if(part_of_speech != 'undefined') field2 += part_of_speech;
      if(field2 != '| ' && tag != 'undefined') field2 += ', ';
      if(tag != 'undefined') field2 += tag;
      if(field2 != '| ' && see_also != 'undefined') field2 += ', ';
      if(see_also != 'undefined') field2 += see_also;
      if(field2 == '') field2 = '--------------------';

       embed = embed.addField( j+1 + '. ' + english_definition, field2);
    }

      message.channel.send({embed: embed});
  });

  msg.delete();
}

module.exports.help = {
  name: "jisho"
}
