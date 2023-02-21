const MinecraftCommand = require('../../contracts/MinecraftCommand')

class NyaCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'nya'
    this.aliases = ["nyah","meow","mew"]
    this.description = 'Gives needed welcome info'
  }

  onCommand(username, message) {

    this.send(`/gc Welcome to TempestSky! Run !claim in guild chat to claim your roles and join our discord server for chats, bots, giveaways & more through !discord.`)

  }
}

module.exports = NyaCommand