const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js-light')
const axios = require('axios')
class MeowCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'meow'
    this.aliases = ['woof', 'bark']
    this.description = 'meows (maybe?)'
    this.reqRole = "User"
  }

  onCommand(message) {
    var chosen_string = ""
    let is_barking = (Math.floor(Math.random() * 100) === 99);
    if (is_barking) {
      chosen_string = `woof!`
    } else {
      let is_responding_as_cat = (Math.floor(Math.random() * 100) > 50);
      if (is_responding_as_cat) {
        var possible_messages = ["*Stares blankly into the distance, pondering life, fish and world domination.*", "*Considers being thankful to its' servants, then decides otherwise.* ", "*Stares at its' filled bowls for more food.*", "*spots a bird in the distance and decides to try and catch it, jumping at it with all the grace of an albatross just learning to fly.*"]
        var chosen_string = possible_messages[Math.floor(Math.random() * possible_messages.length)]

      } else {
        chosen_string = `meow!`
      }

    }

    let message_embed = new Discord.MessageEmbed()
      .setColor('F04947')
      .setTimestamp()
      .setFooter('Powered by the CatAPI')
      .setAuthor(`${chosen_string}`);

    let url = `https://thecatapi.com/api/images/get?format=src&type=gif`

    if (is_barking) {
      url = `https://thedogapi.com/api/images/get?format=src&type=gif`

    }
    axios(url).then(data => { console.log(data.request.res.responseUrl); return data.request.res.responseUrl }).then(image_url => {
      console.log(image_url)
      if (is_barking) {
        message.channel.send({
          embeds: [{
            author: {
              name: chosen_string
            },
            image: {
              url: url,
            },
            color: 0xF04947,
            timestamp: new Date(),
            footer: {
              text: "Powered by the DogAPI",
            },

          }],
        })
      }
      else {
        message.channel.send({
          embeds: [{
            author: {
              name: chosen_string
            },
            image: {
              url: url,
            },
            color: 0xF04947,
            timestamp: new Date(),
            footer: {
              text: "Powered by the CatAPI",
            },

          }],
        })
      }
    }).catch(err => console.log(err))

  }
}

module.exports = MeowCommand