const DiscordCommand = require('../../contracts/DiscordCommand')
async function getNeko() {
    const response = await fetch('https://nekos.best/api/v2/neko')
    const json = await response.json()
    return json.results[0].url
}

class MuteCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'neko'
    this.description = 'neko'
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()

    getNeko().then(neko => {
        message.channel.send({
            embeds: [{
                image: {
                    url: neko,
                  },
                color: 0x2A2A2A,
                timestamp: new Date(),
                footer: {
                    text: "BOT",
                },
            }],
        })
    })
  }
}

module.exports = MuteCommand