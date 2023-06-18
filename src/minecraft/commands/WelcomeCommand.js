const MinecraftCommand = require('../../contracts/MinecraftCommand')

class PingCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'welcome'
    this.aliases = ["wc","welc","w"]
    this.description = 'Gives needed welcome info'
  }

  onCommand(username, message) {

    this.send(`/gc Welcome to Tempest! Run !claim in guild chat to claim your roles and join our discord server for chats, bots, giveaways & more through !discord.`)

  }
}

module.exports = PingCommand
