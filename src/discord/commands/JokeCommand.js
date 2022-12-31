const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");

class JokeCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'joke'
    this.description = 'Returns Guild Top EXP from specified day'
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    message.channel.send({
      embed: {
        description: `<@524222836949123084>`,
        color: '47F049'
      }
    })
  }
}
module.exports = JokeCommand