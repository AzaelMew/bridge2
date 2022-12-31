const MinecraftCommand = require('../../contracts/MinecraftCommand')

class PingCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'help'
    this.aliases = []
    this.description = 'Gives needed welcome info'
  }

  onCommand(username, message) {
      this.send(`/gc TempestBridge (Bot) has a variety of commands which can be used through the guild chat for things like Networth, Stats, Skills, Fragbot and more! Check discord for more details.`)
  }
}

module.exports = PingCommand
