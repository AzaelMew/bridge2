const MinecraftCommand = require('../../contracts/MinecraftCommand')

class PingCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'discord'
    this.aliases = []
    this.description = 'Discord'
  }

  onCommand(username, message) {
    this.send(`/gc Join our Discord Server! https://discord.gg/qcTBPxR`)
  }
}

module.exports = PingCommand
