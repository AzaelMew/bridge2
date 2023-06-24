const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");

async function getNeko() {
    const { data } = await axios.get('https://nekos.best/api/v2/pat')
    return data
}

class NekoCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'pat'
    this.description = 'pat'
    this.reqRole = "User"
  }
  onCommand(message) {
    let author = message.author.id
    let args = this.getArgs(message)
    let user = args.shift()

    getNeko().then(data => {
        let neko = data.results[0].url
        let anime = data.results[0].anime_name
        message.channel.send({
            embeds: [{
                description: `<@${author}> pats ${user}`,
                image: {
                    url: neko,
                  },
                color: 0x2A2A2A,
                timestamp: new Date(),
                footer: {
                    text: `Anime: ${anime}`,
                },
            }],
        })
    })
  }
}

module.exports = NekoCommand
